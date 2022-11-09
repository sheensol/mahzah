<?php

namespace App\Models;

use App\Traits\Uploadable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LessonTypeVideo extends Model
{
    use HasFactory, Uploadable;

    const ICON = "bi bi-camera-video";

    protected $table = 'lesson_type_video';

    protected $guarded = [];

    public function lesson()
    {
        return $this->morphOne(Lesson::class, 'lessonable');
    }
}
