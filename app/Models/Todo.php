<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\TodoFactory;
class Todo extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $table = 'todos';

     // Define the attributes that are mass assignable
    protected $fillable = ['title', 'body', 'completed', 'user_id'];
    protected $dates = ['deleted_at'];
   
    protected $casts = [
        'completed' => 'boolean',
    ];

    // Optionally, you can set default values for specific attributes
    protected $attributes = [
        'completed' => false, // By default, the task is not completed
    ];
 

     public static function boot()
    {
        parent::boot();
    
    }

    // Scope to get only non-deleted (active) tasks
    public function scopeActive($query)
    {
        return $query->whereNull('deleted_at');
    }

    // Scope to get completed tasks
    public function scopeCompleted($query)
    {
        return $query->where('completed', true);
    }

    // Scope to get incomplete tasks
    public function scopeIncomplete($query)
    {
        return $query->where('completed', false);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
}
