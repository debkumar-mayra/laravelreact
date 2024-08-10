<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\UserController;

Route::any('admin/login', [AuthController::class, 'login'])->name('admin.login');
Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {
   Route::any('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
   Route::any('/profile', [AuthController::class, 'profile'])->name('profile');
   Route::post('/change-password',[AuthController::class,'changePassword'])->name('changePassword');

   Route::get('/users',[UserController::class,'index'])->name('userList');



});