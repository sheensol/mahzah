<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LessonTypeVideoPlatformResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $duration = $this->duration ? explode(":", $this->duration) : [0, 0];
        return [
            'id' => $this->id,
            'video_type' => $this->video_type,
            'video_url' => $this->video_url,
            'duration' => $this->duration,
            'content' => $this->content ?? '',
        ];
    }
}
