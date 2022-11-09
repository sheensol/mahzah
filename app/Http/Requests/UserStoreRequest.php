<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
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
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email', Rule::unique('users')],
            'password' => ['nullable'],
            'roles' => ['required', 'array'],
            'roles.*' => Rule::exists('roles', 'id'),
            'enrollments' => ['nullable', 'array'],
            'enrollments.*.id' => Rule::exists('courses', 'id')->where(function ($query) {
                return $query->where('creator_id', Auth::id());
            }),
        ];
    }
}
