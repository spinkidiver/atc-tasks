<?php

namespace App\Repositories\Comment;

use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Comment\PaginateCommentRequest;

class CommentRepositoryImpl implements CommentRepository
{

    public function paginate($request)
    {
        $limit = $request->input('limit', 10);
        $page = $request->input('current_page', 1);
        $taskId = $request->input('task_id', 0);

        $search = $request->input('search');
        $allowedSorts = ['id', 'name', 'description', 'priority', 'created_at', 'expires_at'];
        $sortColumn = in_array($request->sort_column, $allowedSorts) ? $request->sort_column : 'id';
        $sortDirection = in_array(strtolower($request->sort_direction), ['asc', 'desc']) ? strtolower($request->sort_direction) : 'asc';

        $query = Comment::query()->where('task_id', $taskId);

        if ($search) {
            $query->orWhere('content', 'like', "%{$search}%");

        }


        // Si la columna es id, hacer cast para que ordene como número
        if ($sortColumn === 'id') {
            $query->orderByRaw("CAST(id AS UNSIGNED) $sortDirection");
        } else {
            $query->orderBy($sortColumn, $sortDirection);
        }

        return $query->paginate($limit, ['*'], 'page', $page);
    }




    public function create(array $data)
    {
        return Comment::create($data);
    }


    public function getById($id)
    {
        return Comment::findOrFail($id);
    }


    public function update($id, array $data) : string
    {
        $updated = Comment::whereId($id)->update($data);

        if($updated == 0)
            throw new \Exception('Comment not found.');

        return  'successfully updated';
    }


    public function delete($id) : string
    {
        $deleted = Comment::find($id);

        if(is_null($deleted))
            throw new \Exception('Comment not found.');

        $deleted->update(['active'=>false]);
        $deleted->delete();

        return  'successfully deleted';

    }



}
