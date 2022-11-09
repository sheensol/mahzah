<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chapter extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'chapter_id')
            ->orderBy('order', 'DESC');
    }

    public function delete()
    {
        $lessons = $this->lessons;
        if (!empty($lessons)) {
            foreach ($lessons as $lesson) {
                $lesson->delete();
            }
        }
        return parent::delete();
    }
}
