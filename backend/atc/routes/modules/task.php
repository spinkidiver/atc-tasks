<?php
use App\Http\Controllers\Api\TaskController;


  Route::get('/tasks', [TaskController::class, 'index']);
  Route::post('/tasks', [TaskController::class, 'store']);
  Route::put('/tasks/{id}', [TaskController::class, 'update']);
  Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
