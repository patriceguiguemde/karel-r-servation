<?php

namespace App\Http\Middleware;  // ← IMPORTANT : Ce namespace exact

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole  // ← IMPORTANT : Ce nom de classe exact
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();
        
        if (!$user || !in_array($user->role, $roles)) {
            return response()->json([
                'success' => false,
                'message' => 'Accès refusé'
            ], 403);
        }
        
        return $next($request);
    }
}