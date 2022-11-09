<?php

namespace App\Http\Requests\Admin\Course;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CourseUpdateSettingsRequest extends FormRequest
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
            'course_title' => ['required', 'max:200'],
            'course_slug' => ['required', 'max:200'],
            'course_instructor_id' => [
                'nullable',
                Rule::exists('instructors', 'id')
            ],
            'course_is_private' => ['required', 'boolean'],
            'course_is_hidden' => ['required', 'boolean']
        ];
    }
}
