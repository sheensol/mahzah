<?php

namespace App\Models;

use App\Traits\Uploadable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LessonTypeAudio extends Model
{
    use HasFactory, Uploadable;

    const ICON = "bi bi-megaphone";

    protected $table = 'lesson_type_audio';

    protected $guarded = [];

    public function lesson()
    {
        return $this->morphOne(Lesson::class, 'lessonable');
    }
}
