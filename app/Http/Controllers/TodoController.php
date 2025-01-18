<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // Show all tasks
    public function index(Request $request)
    {
        // Fetch all tasks that belong to the authenticated user
        
        $userId = $request->user()->id ?? null;
        if(is_null($userId)){
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $tasks = Todo::where('user_id', $userId)->get();

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);
        
        $userId = $request->user()->id ?? null;
     
        // Create the task and associate it with the logged-in user
        $task = Todo::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => $userId, // Associate the task with the logged-in user
            'completed' => false,
        ]);
    
        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
            // Find the task by its ID
        $task = Todo::findOrFail($id);

        // Check if the task belongs to the authenticated user
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        // Validate the incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        // Update the task
        $task->update([
            'title' => $request->title,
            'body' => $request->body,
            'completed' => $request->completed ?? $task->completed,  // Preserve the previous 'completed' status if not passed
        ]);

        return response()->json($task);
    }

    public function destroy(Request $request ,$id)
    {
        $todo = Todo::findOrFail($id); // Find the todo or fail

    // Check if the authenticated user is the owner of the todo
    if ($todo->user_id !== $request->user()->id) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $todo->delete(); // Delete the todo

    return response()->json(['message' => 'Todo deleted successfully']);
    }

     // Optional: Define a method to mark a todo as completed
     public function markAsCompleted()
     {
         $this->completed = true;
         $this->save();
     }
 
     // Optional: Define a method to mark a todo as incomplete
     public function markAsIncomplete()
     {
         $this->completed = false;
         $this->save();
     }
}

