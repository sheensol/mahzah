<?php

namespace Database\Seeders;

use App\Models\CourseTemplate;
use Illuminate\Database\Seeder;

class CourseTemplatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $course_template = new CourseTemplate();
        $course_template->title = "Mini-Course";
        $course_template->description = "Use a free or low-cost mini-course to generate leads for a full flagship course or service.";
        $course_template->icon = "bi bi-book";
        $course_template->data = "";
        $course_template->save();

        $course_template = new CourseTemplate();
        $course_template->title = "Practice Test";
        $course_template->description = "Help students prepare for certification exams by providing practice questions.";
        $course_template->icon = "bi bi-journal-text";
        $course_template->data = "";
        $course_template->save();

        $course_template = new CourseTemplate();
        $course_template->title = "Custom Template";
        $course_template->description = "Start fresh and build your own course to match your specific curriculum needs.";
        $course_template->icon = "bi bi-globe";
        $course_template->data = "";
        $course_template->save();

    }
}
