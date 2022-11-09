<?php

namespace App\Http\Requests\Admin\Course;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SortChaptersSettingsRequest extends FormRequest
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
            'chapter_ids' => ['required', 'array'],
            'chapter_ids.*' => Rule::exists('chapters', 'id')->where(function ($query) {
                return $query->where('course_id', $this->route('course')->id);
            })
        ];
    }
}
