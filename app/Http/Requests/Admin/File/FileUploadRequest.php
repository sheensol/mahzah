<?php

namespace App\Http\Requests\Admin\File;

use App\Models\FileUpload;
use App\Rules\ImageDataUrl;
use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
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
            'uploadableSection' => ['required', 'array'],
            'uploadableSection.name' => ['required', 'in:' . implode(",", array_keys(FileUpload::UPLOADABLE_SECTION))],
            'isLibaray' => ['required', 'boolean']
        ];

        if ($this->request->get('isLibaray')) {
            $rules['thumbnails'] = ['required', 'array'];
            $rules['thumbnails.*'] = [new ImageDataUrl];
        }
        return $rules;
    }


    public function messages()
    {
        $messages = [
            'uploadableSection.name.required' => "Uploadable section is missing.",
            'uploadableSection.name.in' => "The selected uploadable section is invalid.",
        ];

        // if ($this->request->get('isLibaray')) {
        //     $messages['thumbnails.*.image'] = 'The video thumbnail is not valid image.';
        // }

        return $messages;
    }
}
