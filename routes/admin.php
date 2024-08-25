<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\UserController;

Route::get('/admin', function () {
    return redirect()->route('admin.login');
});

Route::any('admin/login', [AuthController::class, 'login'])->name('admin.login');
Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {
   Route::any('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
   Route::any('/profile', [AuthController::class, 'profile'])->name('profile');
   Route::post('/change-password',[AuthController::class,'changePassword'])->name('changePassword');

   Route::get('/users',[UserController::class,'index'])->name('users');
   Route::any('create-user', [UserController::class,'createUser'])->name('createUser');
   Route::any('edit-user/{user}', [UserController::class,'editUser'])->name('editUser');
   Route::get('change-user-status/{user}', [UserController::class,'changeUserStatus'])->name('changeUserStatus');
   Route::get('delete-user/{user}', [UserController::class,'deleteUser'])->name('deleteUser');

});