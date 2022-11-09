<?php

namespace App\Http\Resources;

use App\Http\Resources\UploadFilesResource;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonTypeDownloadResource extends JsonResource
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
            'content' => $this->content ?? '',
            'files' => UploadFilesResource::collection($this->files)
        ];
    }
}
