<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonTypeText extends Model
{
    use HasFactory;

    const ICON = "bi bi-file-text";

    protected $table = 'lesson_type_text';

    protected $guarded = [];

    public function lesson()
    {
        return $this->morphOne(Lesson::class, 'lessonable');
    }
}
