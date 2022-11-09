<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UploadFilesResource extends JsonResource
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
            'filename' => $this->filename,
            'mimetype' => $this->mimetype,
            'ext' => $this->ext,
            'size' => $this->size,
            'video_thumbnail' => $this->video_thumbnail,
            'is_archived' => $this->is_archived,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            'uploadable_section' => $this->pivot->uploadable_section ?? "Primary"
        ];
    }
}
