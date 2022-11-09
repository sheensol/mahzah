<?php

namespace App\Http\Requests\Admin\Course;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SortLessonsSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'lesson_ids' => ['required', 'array'],
            'lesson_ids.*' => Rule::exists('lessons', 'id')->where(function ($query) {
                return $query->where('chapter_id', $this->route('chapter')->id);
            })
        ];
    }
}
