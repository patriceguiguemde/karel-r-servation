<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

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
    }
}
