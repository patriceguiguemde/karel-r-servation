<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('reservations', function (Blueprint $table) {
            if (!Schema::hasColumn('reservations', 'departure_country')) {
                $table->string('departure_country')->nullable()->after('departure_city');
            }
            if (!Schema::hasColumn('reservations', 'arrival_country')) {
                $table->string('arrival_country')->nullable()->after('arrival_city');
            }
        });
    }

    public function down()
    {
        Schema::table('reservations', function (Blueprint $table) {
            if (Schema::hasColumn('reservations', 'departure_country')) {
                $table->dropColumn('departure_country');
            }
            if (Schema::hasColumn('reservations', 'arrival_country')) {
                $table->dropColumn('arrival_country');
            }
        });
    }
};