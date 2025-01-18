<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfNotAuthenticated
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated using Sanctum
        if (Auth::check() || $request->bearerToken()) {
            return $next($request);
        }

        // Redirect to login page if not authenticated
        return redirect()->route('login');
    }
}
