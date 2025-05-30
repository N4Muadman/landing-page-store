<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('login', [AuthController::class, 'login'])->name('login');
Route::post('login', [AuthController::class, 'postLogin'])->name('login.post');

Route::get('logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('is_admin')->prefix('admin')->group(function ()  {
    Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::resource('quan-ly-san-pham', ProductController::class)->names('products');

});
