<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ImageDataUrl implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if(isset($value)) {
            $data = str_replace('data:image/png;base64,', '', $value);
            $image = base64_decode($data);
            $f = finfo_open();
            $result = finfo_buffer($f, $image, FILEINFO_MIME_TYPE);
            return $result == 'image/png';    
        } else {
            return true;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute format is invalid data URL.';
    }
}
