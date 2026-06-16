<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Enregistre les services applicatif.
     */
    public function register(): void
    {
        //
    }

    /**
     * initialiser lices applicatif 
     */
    public function boot(): void
    {
      Schema::defaultStringLength(191);

        ResetPassword::createUrlUsing(function ($user, string $token) {
        return config('app.frontend_url') . '/admin-reset-password?token=' . $token . '&email=' . urlencode($user->email);
        });
      
      

    }
}
