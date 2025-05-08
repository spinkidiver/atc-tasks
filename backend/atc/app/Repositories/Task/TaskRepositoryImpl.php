<?php

namespace App\Repositories\Task;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Task\PaginateTaskRequest;

class TaskRepositoryImpl implements TaskRepository
{

    public function paginate($request)
    {
        $limit = $request->input('limit', 10);
        $page = $request->input('current_page', 1);
        $search = $request->input('search');
        $priority = $request->input('priority');
        $completed = $request->input('completed');
        $allowedSorts = ['id', 'name', 'description', 'priority', 'created_at', 'expires_at'];
        $sortColumn = in_array($request->sort_column, $allowedSorts) ? $request->sort_column : 'id';
        $sortDirection = in_array(strtolower($request->sort_direction), ['asc', 'desc']) ? strtolower($request->sort_direction) : 'asc';

        $query = Task::query()->where('user_id', Auth::id());

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filtro por prioridad
        if ($priority) {
            $query->where('priority', $priority);
        }

        // Filtro por tarea completada
        if (!is_null($completed)) {
            $query->where('completed', $completed);  // Filtramos por completado (true/false)
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
        $data['user_id'] = Auth::id();
        return Task::create($data);
    }


    public function getById($id)
    {
        return Task::findOrFail($id);
    }


    public function update($id, array $data) : string
    {
        $updated = Task::whereId($id)->update($data);

        if($updated == 0)
            throw new \Exception('Task not found.');

        return  'successfully updated';
    }


    public function delete($id) : string
    {
        $deleted = Task::find($id);

        if(is_null($deleted))
            throw new \Exception('Task not found.');

        $deleted->update(['active'=>false]);
        $deleted->delete();

        return  'successfully deleted';

    }



}
