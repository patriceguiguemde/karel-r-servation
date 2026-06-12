<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test-mail', function () {
    Mail::raw('Test mail Laravel - ça fonctionne !', function($m) {
        $m->to('patriceguiguemde90@gmail.com')->subject('Test Laravel Mail');
    });
    return 'Mail envoyé !';
});
