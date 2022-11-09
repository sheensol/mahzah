<?php

namespace App\Http\Resources;

use App\Models\LessonTypePDF;
use App\Models\LessonTypeText;
use App\Models\LessonTypeAudio;
use App\Models\LessonTypeVideo;
use App\Models\LessonTypeDownload;
use App\Http\Resources\CourseResource;
use App\Http\Resources\ChapterResource;
use App\Models\LessonTypeVideoPlatform;
use App\Http\Resources\LessonTypePDFResource;
use App\Http\Resources\LessonTypeTextResource;
use App\Http\Resources\LessonTypeAudioResource;
use App\Http\Resources\LessonTypeVideoResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\LessonTypeDownloadResource;
use App\Http\Resources\LessonTypeVideoPlatformResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'course' => CourseResource::make($this->whenLoaded('course')),
            'chapter' => ChapterResource::make($this->whenLoaded('chapter')),
            'lessonable_name' => $this->lessonable_name,
            'lessonable_data' => $this->when($this->relationLoaded('lessonable'), function () {
                if ($this->resource->lessonable instanceof LessonTypeText) {
                    return new LessonTypeTextResource($this->resource->lessonable);
                } elseif ($this->resource->lessonable instanceof LessonTypePDF) {
                    return new LessonTypePDFResource($this->resource->lessonable);
                } elseif ($this->resource->lessonable instanceof LessonTypeVideo) {
                    return new LessonTypeVideoResource($this->resource->lessonable);
                } elseif ($this->resource->lessonable instanceof LessonTypeDownload) {
                    return new LessonTypeDownloadResource($this->resource->lessonable);
                } elseif ($this->resource->lessonable instanceof LessonTypeAudio) {
                    return new LessonTypeAudioResource($this->resource->lessonable);
                } elseif ($this->resource->lessonable instanceof LessonTypeVideoPlatform) {
                    return new LessonTypeVideoPlatformResource($this->resource->lessonable);
                }
            }),            
            'is_free' => $this->is_free,
            'is_prerequisite' => $this->is_prerequisite,
            'enable_discussions' => $this->enable_discussions,
            'lesson_icon' => $this->lesson_icon,
            'lesson_label' => $this->lesson_label,
            'status' => $this->status,
            'order' => $this->order
        ];
    }
}
