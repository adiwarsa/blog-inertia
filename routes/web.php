<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class)->name('home');
Route::resource('categories', CategoryController::class)->scoped(['category' => 'slug']);
Route::get('articles/list', [ArticleController::class, 'list'])->name('articles.list');
Route::get('/articles/in', [ArticleController::class, 'search'])->name('articles.search');
Route::resource('articles', ArticleController::class)->scoped(['article' => 'slug']);
Route::put('/articles/{article}/publish', [ArticleController::class, 'publish'])->name('articles.publish');
Route::post('/articles/{article}/like', [ArticleController::class, 'like'])->name('articles.like');
Route::get('articles/filter/{key}', [ArticleController::class, 'filter'])->name('articles.filter');
Route::resource('{article}/comments', CommentController::class)->only(['store', 'update', 'destroy']);
Route::post('comments-reply/{comment}', [CommentController::class, 'reply'])->name('comments.reply');
Route::post('comments/mark-as-spam/{comment}', [CommentController::class, 'reportSpam'])->name('comments.reportSpam');
Route::post('comments/like/{comment}', [CommentController::class, 'like'])->name('comments.like');





Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
