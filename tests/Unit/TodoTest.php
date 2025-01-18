<?php

namespace Tests\Unit;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Log;
class TodoTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user and generate a Sanctum token
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('Test Token')->plainTextToken;
    }

    /** @test */
    public function it_can_fetch_all_todos()
    {
        // Arrange
        Todo::factory()->count(5)->create(['user_id' => $this->user->id]); // Create 5 todos for the user

        // Act
        $response = $this->getJson('/api/tasks', [
            'Authorization' => 'Bearer ' . $this->token, // Pass the token
        ]);

        Log::info($response->content());

        // Assert
        $response->assertStatus(200); // Expect successful status code
        $response->assertJsonCount(5); // Ensure 5 todos are returned
    }

   /** @test */
    public function test_it_can_create_a_todo()
    {
        // Create a user first
        $user = User::factory()->create();

        // Now create a todo for this user
        $todo = Todo::factory()->create(['user_id' => $user->id]);

        // Assert the todo was created
        $this->assertDatabaseHas('todos', [
            'title' => $todo->title,
            'user_id' => $user->id,
        ]);
    }

   /** @test */
    public function it_can_update_a_todo()
    {
        // Arrange
        $user = User::factory()->create(); // Create a user
        $todo = Todo::factory()->create(['user_id' => $user->id]); // Create a todo related to the user

        $updatedData = [
            'title' => 'Updated Task',
            'body' => 'This task has been updated.',
            'completed' => true,
            'user_id' => $user->id, // Ensure the user_id remains the same
        ];

        // Act
        $response = $this->putJson("/api/tasks/{$todo->id}", $updatedData);

        // Assert
        $response->assertStatus(200); // Expect successful update
        $this->assertDatabaseHas('todos', $updatedData); // Ensure the todo was updated in the database
    }

   /** @test */
   public function it_can_delete_a_todo()
   {
       // Arrange
       $user = User::factory()->create(); // Create a user
       $todo = Todo::factory()->create(['user_id' => $user->id]); // Create a todo related to the user
   
       // Act as the user to make sure the request is authenticated
       $response = $this->actingAs($user, 'sanctum') // Authenticate using Sanctum
           ->deleteJson("/api/tasks/{$todo->id}"); // Send DELETE request to the API
   
       // Assert
       $response->assertStatus(200); // Expect successful deletion (200 status)
       $this->assertDatabaseMissing('todos', ['id' => $todo->id]); // Ensure the todo was removed from the database
   }

    /** @test */
    public function it_can_mark_a_todo_as_completed()
    {
        // Arrange
        $user = User::factory()->create(); // Create a user
        $todo = Todo::factory()->create(['completed' => false, 'user_id' => $user->id]); // Create an incomplete todo

        // Act
        $response = $this->patchJson("/api/tasks/{$todo->id}/complete");

        // Assert
        $response->assertStatus(200); // Expect successful completion
        $this->assertDatabaseHas('todos', ['id' => $todo->id, 'completed' => true]); // Ensure todo is marked completed
    }

    /** @test */
    public function it_can_mark_a_todo_as_incomplete()
    {
        // Arrange
        $user = User::factory()->create(); // Create a user
        $todo = Todo::factory()->create(['completed' => true, 'user_id' => $user->id]); // Create a completed todo

        // Act
        $response = $this->patchJson("/api/tasks/{$todo->id}/incomplete");

        // Assert
        $response->assertStatus(200); // Expect successful update to incomplete
        $this->assertDatabaseHas('todos', ['id' => $todo->id, 'completed' => false]); // Ensure todo is marked incomplete
    }
}
