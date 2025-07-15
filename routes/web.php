<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('login', [AuthController::class, 'login'])->name('login');
Route::post('login', [AuthController::class, 'postLogin'])->name('login.post');

Route::get('logout', [AuthController::class, 'logout'])->name('logout');

Route::post('place-order', [OrderController::class, 'store'])->name('place_order');

Route::middleware('is_admin')->prefix('admin')->group(function () {
    Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::resource('quan-ly-san-pham', ProductController::class)->names('products')->parameters(['quan-ly-san-pham' => 'product']);
    Route::resource('quan-ly-don-hang', OrderController::class)->except('store')->names('orders')->parameters(['quan-ly-don-hang' => 'order']);

    Route::get('/orders/stats', [OrderController::class, 'stats'])->name('orders.stats');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.update-status');
    Route::patch('/orders/{order}/consulted', [OrderController::class, 'updateConsulted'])->name('orders.update-consulted');
    Route::post('/orders/bulk-action', [OrderController::class, 'bulkAction'])->name('orders.bulk-action');
});

Route::get('/{slug}', [LandingPageController::class, 'productDetail'])->name('landing-page');
