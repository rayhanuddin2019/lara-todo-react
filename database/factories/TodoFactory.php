<?php 

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Todo;
use App\Models\User;

class TodoFactory extends Factory
{
    protected $model = Todo::class;
    protected $table = 'todos';
    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'body' => $this->faker->paragraph, // More descriptive text
            'user_id' => User::factory(), // Generates a related user
            'completed' => $this->faker->boolean, // Random true/false
        ];
    }
}
