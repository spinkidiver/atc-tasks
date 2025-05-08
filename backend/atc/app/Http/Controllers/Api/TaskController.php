<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Repositories\Task\TaskRepository;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\PaginateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;

class TaskController extends Controller
{

    private TaskRepository $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }


    public function index(PaginateTaskRequest $request)
    {

        try {
            return response()->json([
                'error' => false,
                'data' => $this->taskRepository->paginate($request),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        return response()->json([
            'error' => false,
            'data' => $this->taskRepository->create($data),
        ],
            Response::HTTP_CREATED
        );
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->taskRepository->delete($id);

            return response()->json(null, Response::HTTP_NO_CONTENT);

        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ]);
        }
    }

        /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, string $id): JsonResponse
    {
        try {
            $data = $request->validated();

            return response()->json([
                'error' => false,
                'data' => $this->taskRepository->update($id, $data),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ]);

        }
    }

}
