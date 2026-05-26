<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique()->nullable();
            $table->string('prenom', 100);
            $table->string('nom', 100);
            $table->string('email', 150);
            $table->string('telephone', 20);
            
            //  Tes nouveaux champs ajoutés directement ici
            $table->string('service_type')->nullable();
            $table->text('message')->nullable();
            $table->json('details')->nullable();
            
            $table->string('status')->default('en_attente');
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};