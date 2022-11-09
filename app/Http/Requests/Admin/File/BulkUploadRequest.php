<?php

namespace App\Http\Requests\Admin\File;

use App\Rules\ImageDataUrl;
use Illuminate\Foundation\Http\FormRequest;

class BulkUploadRequest extends FormRequest
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
            'uploads' => ['required', 'array'],
            'isLibaray' => ['required', 'boolean']
        ];

        if ($this->request->get('isLibaray')) {
            $rules['thumbnails'] = ['required', 'array'];
            $rules['thumbnails.*'] = [new ImageDataUrl];
        }
        return $rules;
    }

}