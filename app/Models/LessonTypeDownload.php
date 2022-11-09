<?php

namespace App\Models;

use App\Traits\Uploadable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LessonTypeDownload extends Model
{
    use HasFactory, Uploadable;

    const ICON = "bi bi-file-earmark-arrow-down";

    protected $table = 'lesson_type_download';

    protected $guarded = [];

    public function lesson()
    {
        return $this->morphOne(Lesson::class, 'lessonable');
    }
}
