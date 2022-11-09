<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Http\Resources\ChapterResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'description_min' => $this->description_min,
            'description_max' => $this->description_max,
            'language' => $this->language,
            'img' => $this->image,
            'status' => $this->status,
            'price' => $this->price,
            'enrollment_duration' => $this->enrollment_duration,
            'is_free_course' => $this->is_free_course,
            'is_private' => $this->is_private,
            'is_hidden' => $this->is_hidden,
            'meta_title' => $this->meta_title,
            'meta_keywords' => $this->meta_keywords,
            'meta_description' => $this->meta_description,
            'page_footer_code' => $this->page_footer_code,
            'enable_drip_content' => $this->enable_drip_content,
            'chapters' => ChapterResource::collection($this->whenLoaded('chapters')),
            'creator' => UserResource::make($this->whenLoaded('creator')),
            'instructor' => InstructorResource::make($this->whenLoaded('instructor')),
        ];
    }
}
