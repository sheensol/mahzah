<?php

namespace App\Http\Requests\Admin\Course;

use Illuminate\Foundation\Http\FormRequest;

class CourseUpdatePricingRequest extends FormRequest
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
        $rules = [
            'price_type' => ['required', 'in:0,1'],
        ];

        if ($this->request->get('price_type') == 1) {
            $rules['days_until_expiry'] = ['nullable', 'numeric'];
        } elseif ($this->request->get('price_type') == 0) {
            $rules['price'] = ['required', 'numeric', 'min:1'];
            $rules['enrollment_duration'] = ['nullable', 'numeric'];
        }

        return $rules;
    }
}
