<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class PaginateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // ajusta según tus políticas
    }

    public function rules(): array
    {
        return [
            'limit' => 'sometimes|integer|min:1|max:100',
            'current_page' => 'sometimes|integer|min:1',
            'sort_column' => 'sometimes|string|in:id,name,description,priority,completed,expires_at',
            'sort_direction' => 'sometimes|string|in:asc,desc',
            'search' => 'nullable|string|max:255',
            'priority' => 'sometimes|string|in:low,medium,high',
            'completed' => 'nullable|boolean',

        ];
    }
}
