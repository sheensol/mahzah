<?php

namespace App\Models;

use ReflectionClass;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lesson extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function lessonable()
    {
        return $this->morphTo();
    }

    public function getLessonableNameAttribute()
    {
        return (new ReflectionClass($this->lessonable))->getShortName();
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class, 'chapter_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function delete()
    {
        $lessonable = $this->lessonable;

        if (method_exists($lessonable, 'files')) {
            $files = $lessonable->files;
            foreach ($files as $file) {
                $file->delete();
            }
        }

        $lessonable->delete();
        return parent::delete();
    }
}
