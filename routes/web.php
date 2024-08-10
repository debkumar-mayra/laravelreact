<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/welcome',function(){
    return view('Welcome');
});
Route::get('/', function () {
    return redirect()->route('login');
});

Route::any('/login', [AuthController::class, 'login'])->name('login');

Route::any('/registration', [AuthController::class, 'register'])->name('register');

Route::any('/forgot-password', [AuthController::class, 'forgotPassword'])->name('forgotPassword');
Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard')->middleware('auth');
Route::any('/logout', [AuthController::class, 'logout'])->name('logout');

include('admin.php');
include('artisan.php');