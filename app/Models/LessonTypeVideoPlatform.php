<?php

namespace App\Models;

use App\Traits\Uploadable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LessonTypeVideoPlatform extends Model
{
    use HasFactory, Uploadable;

    const ICON = "bi bi-file-play";

    protected $table = 'lesson_type_video_platform';

    protected $guarded = [];

    public function lesson()
    {
        return $this->morphOne(Lesson::class, 'lessonable');
    }
}
