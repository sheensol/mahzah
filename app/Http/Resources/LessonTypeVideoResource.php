<?php

namespace App\Http\Resources;

use App\Http\Resources\UploadFilesResource;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonTypeVideoResource extends JsonResource
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
            'is_video_downloadable' => $this->is_video_downloadable,
            'video_optional_content' => $this->content ?? '',
            'files' => UploadFilesResource::collection($this->files)
        ];
    }
}
