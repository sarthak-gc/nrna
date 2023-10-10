<?php

use App\Http\Controllers\BusinessController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', [HomeController::class, 'index']);
Route::get('/business', [BusinessController::class, 'index'])->name('business.index');
Route::get('/business/create', [BusinessController::class, 'create'])->name('business.create');
Route::post('/business', [BusinessController::class, 'store']);