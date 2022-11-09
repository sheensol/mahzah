<?php

namespace App\Http\Requests\Admin\Course;

use App\Rules\VimeoUrl;
use App\Rules\YouTubeUrl;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class LessonUpdateSettingsRequest extends FormRequest
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
            'lesson_title' => ['required', 'max:200'],
            'is_free' => ['required', 'boolean'],
            'is_prerequisite' => ['required', 'boolean'],
            'enable_discussions' => ['required', 'boolean'],
            'status' => 'required|in:Draft,Active',
        ];

        switch ($this->route('lesson')->lessonable_name) {
            case 'LessonTypeText':
                $rules['content'] = ['required'];
                break;
            case 'LessonTypePDF':
                if (count($this->route('lesson')->lessonable->files) == 0) {
                    $rules['pdf_file'] = [
                        'required',
                        Rule::exists('files', 'id')
                    ];
                }
                $rules['is_content_downloadable'] = ['required', 'boolean'];
                break;
            case 'LessonTypeVideo':
                if (
                    $this->route('lesson')->lessonable->files()
                    ->where('uploadable_section', 'Primary')->count() == 0
                ) {
                    $rules['video_file'] = [
                        'required',
                        Rule::exists('files', 'id')
                    ];
                }
                $rules['video_optional_content'] = ['nullable'];
                $rules['is_video_downloadable'] = ['required', 'boolean'];
                break;
            case 'LessonTypeDownload':
                $rules['download_content'] = ['required'];
                $rules['download_files'] = ['required', 'array'];
                break;
            case 'LessonTypeAudio':
                if (
                    $this->route('lesson')->lessonable->files()
                    ->where('uploadable_section', 'Primary')->count() == 0
                ) {
                    $rules['audio_file'] = [
                        'required',
                        Rule::exists('files', 'id')
                    ];
                }
                $rules['audio_optional_content'] = ['nullable'];
                $rules['is_audio_downloadable'] = ['required', 'boolean'];
                break;
            case 'LessonTypeVideoPlatform':
                $rules['video_platform_video_type'] = ['required', 'in:youtube,vimeo'];
                $rules['video_platform_video_url'] = [
                    'required',
                    (($this->request->get('video_platform_video_type') == 'youtube') ? new YouTubeUrl : new VimeoUrl)
                ];
                $rules['video_platform_duration'] = ['required', 'date_format:H:i'];
                $rules['video_platform_optional_content'] = ['nullable'];
                break;
        }

        return $rules;
    }
}
