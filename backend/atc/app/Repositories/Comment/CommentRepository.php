<?php

namespace App\Repositories\Comment;
use App\Http\Requests\Comment\PaginateCommentRequest;

interface CommentRepository
{
    public function getById($id);
    public function delete($id);
    public function create(array $details);
    public function update($id, array $data);
    public function paginate($request);
}
