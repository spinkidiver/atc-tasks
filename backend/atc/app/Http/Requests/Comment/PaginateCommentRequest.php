<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

class PaginateCommentRequest extends FormRequest
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
            'sort_column' => 'sometimes|string|in:id,content',
            'sort_direction' => 'sometimes|string|in:asc,desc',
            'search' => 'nullable|string|max:255',
            'task_id' => 'required|integer|min:1',

        ];
    }
}
