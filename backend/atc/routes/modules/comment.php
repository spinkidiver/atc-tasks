<?php
use App\Http\Controllers\Api\CommentController;


  Route::get('/comments', [CommentController::class, 'index']);
  Route::post('/comments', [CommentController::class, 'store']);
//   Route::put('/comments/{id}', [CommentController::class, 'update']);
//   Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
