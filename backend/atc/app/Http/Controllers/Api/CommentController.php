<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Repositories\Comment\CommentRepository;
use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Requests\Comment\PaginateCommentRequest;
use App\Http\Requests\Comment\UpdateCommentRequest;

class CommentController extends Controller
{

    private CommentRepository $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }


    public function index(PaginateCommentRequest $request)
    {

        try {
            return response()->json([
                'error' => false,
                'data' => $this->commentRepository->paginate($request),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function store(StoreCommentRequest $request)
    {
        $data = $request->validated();

        return response()->json([
            'error' => false,
            'data' => $this->commentRepository->create($data),
        ],
            Response::HTTP_CREATED
        );
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->commentRepository->delete($id);

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
    public function update(UpdateCommentRequest $request, string $id): JsonResponse
    {
        try {
            $data = $request->validated();

            return response()->json([
                'error' => false,
                'data' => $this->commentRepository->update($id, $data),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ]);

        }
    }

}
