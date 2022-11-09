<?php

namespace App\Http\Requests\Admin\Course;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class LessonCopySettingsRequest extends FormRequest
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
            'from_lesson_id' => [
                'required',
                Rule::exists('lessons', 'id')->where(function ($query) {
                    return $query->where('id', $this->request->get('from_lesson_id'));
                })
            ],
        ];
    }
}
