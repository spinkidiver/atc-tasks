<?php

namespace App\Repositories\Task;
use App\Http\Requests\Task\PaginateTaskRequest;

interface TaskRepository
{
    public function getById($id);
    public function delete($id);
    public function create(array $details);
    public function update($id, array $data);
    public function paginate(PaginateTaskRequest $request);
}
