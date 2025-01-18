<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\TodoController;



// Register route
Route::post('/register', [UserAuthController::class, 'register'])->name('api.register');

// Login route
Route::post('/login', [UserAuthController::class, 'login'])->name('api.login');

// Logout route (Protected)
Route::middleware('auth:sanctum')->post('/logout', [UserAuthController::class, 'logout'])->name('api.logout');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

Route::get('/tasks', [TodoController::class, 'index'])->middleware('auth:sanctum'); // Show all tasks
Route::post('/tasks', [TodoController::class, 'store'])->middleware('auth:sanctum'); 
Route::put('/tasks/{id}', [TodoController::class, 'update'])->middleware('auth:sanctum'); // Update a task
Route::delete('/tasks/{id}', [TodoController::class, 'destroy'])->middleware('auth:sanctum'); // Delete a task
Route::patch('/tasks/{id}/complete', [TodoController::class, 'markCompleted'])->middleware('auth:sanctum'); // Mark as completed
Route::patch('/tasks/{id}/incomplete', [TodoController::class, 'markIncomplete'])->middleware('auth:sanctum'); // Mark as incomplete

