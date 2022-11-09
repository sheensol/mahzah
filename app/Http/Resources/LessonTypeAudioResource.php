<?php

namespace App\Http\Resources;

use App\Http\Resources\UploadFilesResource;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonTypeAudioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'is_audio_downloadable' => $this->is_audio_downloadable,
            'audio_optional_content' => $this->content ?? '',
            'files' => UploadFilesResource::collection($this->files)
        ];
    }
}
