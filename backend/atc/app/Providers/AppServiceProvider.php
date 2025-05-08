<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;


// Task
use App\Repositories\Task\TaskRepository;
use App\Repositories\Task\TaskRepositoryImpl;
use App\Models\Task;

// Comment
use App\Repositories\Comment\CommentRepository;
use App\Repositories\Comment\CommentRepositoryImpl;
use App\Models\Comment;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Task
        $this->app->bind(TaskRepository::class, function ($app) {
            return new TaskRepositoryImpl(new Task());
        });

          // Comment
          $this->app->bind(CommentRepository::class, function ($app) {
            return new CommentRepositoryImpl(new Comment());
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

    }
}
