<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;


// Auth
Route::post('/auth/signup', [AuthController::class, 'createUser']);
Route::post('/auth/login', action: [AuthController::class, 'login']);
Route::post(uri: '/logout', action: [AuthController::class, 'logout']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get(uri: '/profile', action: [AuthController::class, 'profile']);

    // Task
    require __DIR__ . '/../routes/modules/task.php';

    // Comments
    require __DIR__ . '/../routes/modules/comment.php';
});
