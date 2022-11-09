<?php

namespace App\Http\Controllers;

use Exception;
use Throwable;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Chapter;
use App\Models\FileUpload;
use Illuminate\Support\Str;
use App\Models\LessonTypePDF;
use App\Models\CourseTemplate;
use App\Models\LessonTypeText;
use App\Models\LessonTypeAudio;
use App\Models\LessonTypeVideo;
use App\Models\LessonTypeDownload;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Resources\CourseResource;
use App\Models\LessonTypeVideoPlatform;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use App\Helpers\FileUpload\FileUploader;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\InstructorResource;
use App\Http\Resources\UploadFilesResource;
use App\Http\Resources\CourseTemplateResource;
use App\Http\Requests\Admin\File\BulkUploadRequest;
use App\Http\Requests\Admin\Course\CourseStoreRequest;
use App\Http\Requests\Admin\Course\LessonDeleteRequest;
use App\Http\Requests\Admin\Course\ChapterDeleteRequest;
use App\Http\Requests\Admin\Course\DeleteLessonFileRequest;
use App\Http\Requests\Admin\Course\LessonAddSettingsRequest;
use App\Http\Requests\Admin\Course\LessonUpdateTitleRequest;
use App\Http\Requests\Admin\Course\ChapterAddSettingsRequest;
use App\Http\Requests\Admin\Course\ChapterUpdateTitleRequest;
use App\Http\Requests\Admin\Course\LessonCopySettingsRequest;
use App\Http\Requests\Admin\Course\CourseUpdatePricingRequest;
use App\Http\Requests\Admin\Course\SortLessonsSettingsRequest;
use App\Http\Requests\Admin\Course\CourseUpdateSettingsRequest;
use App\Http\Requests\Admin\Course\LessonUpdateSettingsRequest;
use App\Http\Requests\Admin\Course\SortChaptersSettingsRequest;
use App\Http\Requests\Admin\Course\ChapterUpdateSettingsRequest;
use App\Http\Requests\Admin\Course\CourseDuplicateSettingsRequest;
use App\Http\Requests\Admin\Course\CourseUpdateSettingsSEORequest;
use App\Http\Requests\Admin\Course\CourseUpdateSettingsCodeRequest;
use App\Http\Requests\Admin\Course\CourseUpdateSettingsCourseCardRequest;
use App\Models\Instructor;

class CourcesController extends Controller
{
    public function index()
    {
        $courses = Course::where('creator_id', Auth::id())
            ->with("instructor")->with("creator")
            ->filter(Request::all('search'))
            ->paginate()
            ->appends(Request::all());

        return Inertia::render('Courses/Index', [
            'filters' => Request::all('search'),
            'courses' => CourseResource::collection($courses),
        ]);
    }

    public function create()
    {
        $course_templates = CourseTemplate::where('active', 1)->get();
        return Inertia::render('Courses/Create', [
            'courseTemplates' => CourseTemplateResource::collection($course_templates)
        ]);
    }

    private function saveCopyLesson(Lesson $from_lesson, Chapter $chapter, $change_lesson_label = false)
    {
        // Clone lesson
        $new_lesson = $from_lesson->replicate();
        if ($change_lesson_label) {
            $new_lesson->title = "Copy of " . $new_lesson->title;
        }
        $new_lesson->chapter_id = $chapter->id;
        $new_lesson->course_id = $chapter->course_id;

        $new_lesson->push();

        // Clone lessonable
        $new_lessable = $from_lesson->lessonable->replicate();
        $new_lessable->push();

        $new_lessable->lesson()->save($new_lesson);

        // Clone lessonable files
        $files = $from_lesson->lessonable->files;
        if (!empty($files)) {
            foreach ($files as $file) {
                $new_lessable->files()->save($file, ["uploadable_section" => $file->pivot->uploadable_section]);
            }
        }
    }

    public function duplicateCourse(Course $course, CourseDuplicateSettingsRequest $request)
    {
        DB::beginTransaction();

        try {

            // Clone course
            $new_course = $course->replicate();
            $new_image =  Course::IMAGE_PATH . "/" .
                md5('REPLICATE_' . uniqid()) . "." . File::extension($new_course->img);

            Storage::copy($course->img, $new_image);
            $new_course->img = $new_image;
            $new_course->title = "Copy of " . $new_course->title;

            $new_course->push();

            // Clone chapters and lessons
            $course->chapters->each(
                function ($chapter) use ($new_course) {
                    $new_chapter = $chapter->replicate();
                    $new_chapter->course_id = $new_course->id;
                    $new_chapter->push();

                    $chapter->lessons->each(
                        function ($lesson) use ($new_chapter) {
                            $this->saveCopyLesson($lesson, $new_chapter);
                        }
                    );
                }
            );

            DB::commit();
            return Redirect::back()
                ->with('success', 'Course copied successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Course could not be copied.');
        }
    }

    public function copyLesson(Chapter $chapter, LessonCopySettingsRequest $request)
    {
        DB::beginTransaction();

        try {

            $from_lesson = Lesson::find($request->from_lesson_id);
            $this->saveCopyLesson($from_lesson, $chapter, true);

            DB::commit();
            return Redirect::back()
                ->with('success', 'Lesson copied successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Lesson could not be copied.');
        }
    }

    public function store(CourseStoreRequest $request)
    {
        try {

            $course = new Course();
            $user = auth()->user();
            $course->creator()->associate($user->id);

            $course->title = $request->course_title;
            $course->slug = Str::slug($request->course_title);

            $course->save();

            return Redirect::route('courses.edit', $course->id)
                ->with('success', 'Course created successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Course could not be created.');
        }
    }

    public function edit(Course $course)
    {
        $courses = Course::where('creator_id', Auth::id())
            ->with("chapters.lessons")->get();
        $library_files = FileUpload::where('creator_id', Auth::id())
            ->where('is_libaray', true)->where('is_archived', false)->get();
        return Inertia::render('Courses/EditCourse/Curriculum', [
            'course' => new CourseResource($course->load('chapters.lessons.lessonable')),
            'courses' => CourseResource::collection($courses),
            'libraryFiles' => UploadFilesResource::collection($library_files)
        ]);
    }

    public function bulkImporter(Course $course)
    {
        return Inertia::render('Courses/EditCourse/BulkImporter', [
            'course' => new CourseResource($course->load('chapters.lessons.lessonable'))
        ]);
    }

    public function drip(Course $course)
    {
        return Inertia::render('Courses/EditCourse/Drip', [
            'course' => new CourseResource($course),
        ]);
    }

    public function pricing(Course $course)
    {
        return Inertia::render('Courses/EditCourse/Pricing', [
            'course' => new CourseResource($course),
        ]);
    }

    public function updatePricing(Course $course, CourseUpdatePricingRequest $request)
    {
        try {

            $course->is_free_course = $request->price_type;

            if ($request->price_type == 1) {
                $course->price = 0;
                $course->enrollment_duration = $request->days_until_expiry;
            } elseif ($request->price_type == 0) {
                $course->price = $request->price;
                $course->enrollment_duration = $request->enrollment_duration;
            }

            $course->save();

            return Redirect::back()
                ->with('success', 'Pricing settings updated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Pricing settings could not be updated.');
        }
    }

    public function grade(Course $course)
    {
        return Inertia::render('Courses/EditCourse/Grade', [
            'course' => new CourseResource($course),
        ]);
    }


    public function settings(Course $course)
    {
        return Inertia::render('Courses/EditCourse/Settings', [
            'course' => new CourseResource($course->load('instructor')),
            'instructors' => InstructorResource::collection(
                Instructor::orderBy('first_name')->get()
            )
        ]);
    }

    public function sortChapters(Course $course, SortChaptersSettingsRequest $request)
    {

        $validatedIds = $request->validated();
        DB::beginTransaction();

        try {

            $chapter_ids = array_reverse($validatedIds['chapter_ids']);
            $chapters = Chapter::where('course_id', $course->id)
                ->whereIn('id', $chapter_ids)
                ->orderByRaw("FIELD(id, " . implode(",", $chapter_ids) . ")")
                ->get();

            $order = 1;
            foreach ($chapters as $row) {
                $row->order = $order;
                $row->save();
                $order++;
            }

            DB::commit();
            return Redirect::back()
                ->with('success', 'Chapters sorted successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Chapters could not be sorted.');
        }
    }

    public function sortLessons(Chapter $chapter, SortLessonsSettingsRequest $request)
    {

        $validatedIds = $request->validated();
        DB::beginTransaction();

        try {
            $lesson_ids = array_reverse($validatedIds['lesson_ids']);
            $lessons = Lesson::where('chapter_id', $chapter->id)
                ->whereIn('id', $lesson_ids)
                ->orderByRaw("FIELD(id, " . implode(",", $lesson_ids) . ")")
                ->get();

            $order = 1;
            foreach ($lessons as $row) {
                $row->order = $order;
                $row->save();
                $order++;
            }

            DB::commit();
            return Redirect::back()
                ->with('success', 'Lessons sorted successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Lessons could not be sorted.');
        }
    }

    public function destroyLessonFile(Lesson $lesson, FileUpload $file, DeleteLessonFileRequest $request)
    {
        try {

            $lesson->lessonable->files()->detach($file->id);

            return Redirect::back()
                ->with('success', 'Lesson file deleted successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Lesson file could not be deleted.');
        }
    }

    public function updateLessonTitle(Lesson $lesson, LessonUpdateTitleRequest $request)
    {

        try {

            $lesson->title = $request->lesson_title;
            $lesson->save();

            return Redirect::back();
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Lesson could not be updated.');
        }
    }

    public function updateLesson(Lesson $lesson, LessonUpdateSettingsRequest $request)
    {

        DB::beginTransaction();
        try {

            $lesson->title = $request->lesson_title;
            $lesson->is_free = $request->is_free;
            $lesson->is_prerequisite = $request->is_prerequisite;
            $lesson->enable_discussions = $request->enable_discussions;
            $lesson->status = $request->status;

            $lesson->save();

            // Morph updates ..
            switch ($lesson->lessonable_name) {
                case 'LessonTypeText':
                    $lesson->lessonable()->update([
                        'content' => $request->content
                    ]);
                    break;
                case 'LessonTypePDF':
                    $lesson->lessonable()->update([
                        'is_content_downloadable' => $request->is_content_downloadable
                    ]);
                    if ($request->pdf_file) {
                        $files = FileUpload::whereIn("id", [$request->pdf_file])->get();
                        if (!empty($files)) {
                            $lesson->lessonable->files()->wherePivot('uploadable_section', 'Primary')->detach();
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('PDF', 'Primary', $file->ext)) {
                                    $lesson->lessonable->files()->save($file, ["uploadable_section" => "Primary"]);
                                }
                            }
                        }
                    }
                    break;
                case 'LessonTypeVideo':
                    $lesson->lessonable()->update([
                        'is_video_downloadable' => $request->is_video_downloadable,
                        'content' => $request->video_optional_content
                    ]);
                    if ($request->video_file) {
                        $files = FileUpload::whereIn("id", [$request->video_file])->get();
                        if (!empty($files)) {
                            $lesson->lessonable->files()->wherePivot('uploadable_section', 'Primary')->detach();
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('Video', 'Primary', $file->ext)) {
                                    $lesson->lessonable->files()->save($file, ["uploadable_section" => "Primary"]);
                                }
                            }
                        }
                    }
                    if ($request->video_optional_downloads) {
                        $files = FileUpload::whereIn("id", (array_column($request->video_optional_downloads, "id")))->get();
                        if (!empty($files)) {
                            $lesson->lessonable->files()->wherePivot('uploadable_section', 'Downloads')->detach();
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('Video', 'Downloads', $file->ext)) {
                                    $lesson->lessonable->files()->save($file, ["uploadable_section" => "Downloads"]);
                                }
                            }
                        }
                    }
                    break;
                case 'LessonTypeDownload':
                    $lesson->lessonable()->update([
                        'content' => $request->download_content
                    ]);
                    if ($request->download_files) {
                        $files = FileUpload::whereIn("id", (array_column($request->download_files, "id")))->get();
                        if (!empty($files)) {
                            $lesson->lessonable->files()->wherePivot('uploadable_section', 'Downloads')->detach();
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('Download', 'Downloads', $file->ext)) {
                                    $lesson->lessonable->files()->save($file, ["uploadable_section" => "Downloads"]);
                                }
                            }
                        }
                    }
                    break;
                case 'LessonTypeAudio':
                    $lesson->lessonable()->update([
                        'is_audio_downloadable' => $request->is_audio_downloadable,
                        'content' => $request->audio_optional_content
                    ]);
                    if ($request->audio_file) {
                        $files = FileUpload::whereIn("id", [$request->audio_file])->get();
                        if (!empty($files)) {
                            $lesson->lessonable->files()->wherePivot('uploadable_section', 'Primary')->detach();
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('Audio', 'Primary', $file->ext)) {
                                    $lesson->lessonable->files()->save($file, ["uploadable_section" => "Primary"]);
                                }
                            }
                        }
                    }
                    break;
                case 'LessonTypeVideoPlatform':
                    $lesson->lessonable()->update([
                        'video_type' => $request->video_platform_video_type,
                        'video_url' => $request->video_platform_video_url,
                        'duration' => $request->video_platform_duration,
                        'content' => $request->video_platform_optional_content,
                    ]);
                    break;
            }

            $any_active_lesson = Lesson::where('chapter_id', $lesson->chapter_id)
                ->where('status', 'Active')->first();

            $lesson->chapter()->update([
                'status' => (!$any_active_lesson ? 'Draft' : 'Active')
            ]);

            DB::commit();
            return Redirect::back()
                ->with('success', 'Lesson updated successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Lesson could not be updated.');
        }
    }

    public function updateChapterTitle(Chapter $chapter, ChapterUpdateTitleRequest $request)
    {
        try {

            $chapter->title = $request->title;
            $chapter->save();

            return Redirect::back();
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Chapter could not be updated.');
        }
    }

    public function updateChapter(Chapter $chapter, ChapterUpdateSettingsRequest $request)
    {
        try {

            $chapter->title = $request->title;
            $chapter->new_lessons_to_draft = $request->new_lessons_to_draft;

            $chapter->save();

            return Redirect::back()
                ->with('success', 'Chapter updated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Chapter could not be updated.');
        }
    }

    private function validateLessonFile($section, $key, $fileExtension)
    {
        $allowedExtensions = (FileUpload::UPLOADABLE_SECTION)[$section][$key];
        if (
            !in_array($fileExtension, $allowedExtensions)
            && $allowedExtensions[0] != "*"
        ) {
            throw new Exception("Extension {$fileExtension} is not allowed");
        }
        return true;
    }

    public function bulkUpload(Chapter $chapter, BulkUploadRequest $request, FileUploader $fileUploader)
    {
        DB::beginTransaction();
        try {

            $uploadedFiles = $fileUploader->handle($request, 'uploads', [
                'allowedExtensions' => (FileUpload::UPLOADABLE_SECTION)[$request->uploadableSection['name']][$request->uploadableSection['section']]
            ]);

            if (!$uploadedFiles) {
                return Redirect::back()
                    ->with('error', $fileUploader->uploadError);
            }

            foreach ($uploadedFiles as $uploadedKey => $uploadedFile) {
                $chapter_lesson = $chapter->lessons()->create([
                    'title' => pathinfo($uploadedFile['filename'], PATHINFO_FILENAME),
                    'course_id' => $chapter->course->id
                ]);

                if (in_array($uploadedFile['ext'], (FileUpload::UPLOADABLE_SECTION)['Video']['Primary'])) {

                    $fileUploadData = array_merge($uploadedFile, [
                        'is_libaray' => true,
                        'video_thumbnail' => $request->thumbnails[$uploadedKey],
                        'creator_id' => Auth::id()
                    ]);

                    $chapter_lesson->lesson_icon = LessonTypeVideo::ICON;
                    $chapter_lesson->save();
                    $lesson_type = LessonTypeVideo::create(['is_video_downloadable' => false]);
                } elseif (in_array($uploadedFile['ext'], (FileUpload::UPLOADABLE_SECTION)['PDF']['Primary'])) {

                    $fileUploadData = array_merge($uploadedFile, [
                        'is_libaray' => false,
                        'creator_id' => Auth::id()
                    ]);

                    $chapter_lesson->lesson_icon = LessonTypePDF::ICON;
                    $chapter_lesson->save();

                    $lesson_type = LessonTypePDF::create(['is_content_downloadable' => false]);
                } elseif (in_array($uploadedFile['ext'], (FileUpload::UPLOADABLE_SECTION)['Audio']['Primary'])) {

                    $fileUploadData = array_merge($uploadedFile, [
                        'is_libaray' => false,
                        'creator_id' => Auth::id()
                    ]);

                    $chapter_lesson->lesson_icon = LessonTypeAudio::ICON;
                    $chapter_lesson->save();

                    $lesson_type = LessonTypeAudio::create(['is_audio_downloadable' => false]);
                }

                $lesson_type->lesson()->save($chapter_lesson);
                $savedFile = FileUpload::create($fileUploadData);
                $lesson_type->files()->save($savedFile, ["uploadable_section" => "Primary"]);
            }

            $lessons = Lesson::where('chapter_id', $chapter->id)
                ->orderBy("order")->get();

            $order = 1;
            $all_in_draft = true;
            foreach ($lessons as $row) {
                if ($all_in_draft && $row->status == 'Active') {
                    $all_in_draft = false;
                }
                $row->order = $order;
                $row->save();
                $order++;
            }

            $chapter->status = $all_in_draft ? 'Draft' : 'Active';
            $chapter->save();

            DB::commit();

            return Redirect::back()
                ->with('success', 'Bulk lessons added successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Bulk lessons could not be added.');
        }
    }

    public function addLesson(Chapter $chapter, LessonAddSettingsRequest $request)
    {
        DB::beginTransaction();
        try {

            $chapter_lesson = $chapter->lessons()->create([
                'title' => $request->lesson_title,
                'course_id' => $chapter->course->id,
                'is_free' => $request->is_free,
                'is_prerequisite' => $request->is_prerequisite,
                'enable_discussions' => $request->enable_discussions,
                'status' => $request->status
            ]);

            switch ($request->lesson_type) {
                case 'LessonTypeText':
                    $chapter_lesson->lesson_icon = LessonTypeText::ICON;
                    $chapter_lesson->save();
                    $lesson_type = LessonTypeText::create(['content' => $request->content]);
                    $lesson_type->lesson()->save($chapter_lesson);
                    break;
                case 'LessonTypePDF':
                    $chapter_lesson->lesson_icon = LessonTypePDF::ICON;
                    $chapter_lesson->save();
                    $lesson_type = LessonTypePDF::create(['is_content_downloadable' => $request->is_content_downloadable]);
                    $lesson_type->lesson()->save($chapter_lesson);
                    if ($request->pdf_file) {
                        $files = FileUpload::whereIn("id", [$request->pdf_file])->get();
                        if (!empty($files)) {
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('PDF', 'Primary', $file->ext)) {
                                    $lesson_type->files()->save($file, ["uploadable_section" => "Primary"]);
                                }
                            }
                        }
                    }
                    break;
                case 'LessonTypeVideo':
                    $chapter_lesson->lesson_icon = LessonTypeVideo::ICON;
                    $chapter_lesson->save();
                    $lesson_type = LessonTypeVideo::create(['is_video_downloadable' => $request->is_video_downloadable, 'content' => $request->video_optional_content]);
                    $lesson_type->lesson()->save($chapter_lesson);
                    if ($request->video_file) {
                        $files = FileUpload::whereIn("id", [$request->video_file])->get();
                        if (!empty($files)) {
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('Video', 'Primary', $file->ext)) {
                                    $lesson_type->files()->save($file, ["uploadable_section" => "Primary"]);
                                }
                            }
                        }
                    }
                    if ($request->video_optional_downloads) {
                        $files = FileUpload::whereIn("id", (array_column($request->video_optional_downloads, "id")))->get();
                        if (!empty($files)) {
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('Video', 'Downloads', $file->ext)) {
                                    $lesson_type->files()->save($file, ["uploadable_section" => "Downloads"]);
                                }
                            }
                        }
                    }
                    break;
                case 'LessonTypeDownload':
                    $chapter_lesson->lesson_icon = LessonTypeDownload::ICON;
                    $chapter_lesson->save();
                    $lesson_type = LessonTypeDownload::create(['content' => $request->download_content]);
                    $lesson_type->lesson()->save($chapter_lesson);
                    if ($request->download_files) {
                        $files = FileUpload::whereIn("id", (array_column($request->download_files, "id")))->get();
                        if (!empty($files)) {
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('Download', 'Downloads', $file->ext)) {
                                    $lesson_type->files()->save($file, ["uploadable_section" => "Downloads"]);
                                }
                            }
                        }
                    }
                    break;
                case 'LessonTypeAudio':
                    $chapter_lesson->lesson_icon = LessonTypeAudio::ICON;
                    $chapter_lesson->save();
                    $lesson_type = LessonTypeAudio::create(['is_audio_downloadable' => $request->is_audio_downloadable, 'content' => $request->audio_optional_content]);
                    $lesson_type->lesson()->save($chapter_lesson);
                    if ($request->audio_file) {
                        $files = FileUpload::whereIn("id", [$request->audio_file])->get();
                        if (!empty($files)) {
                            foreach ($files as $file) {
                                if ($this->validateLessonFile('Audio', 'Primary', $file->ext)) {
                                    $lesson_type->files()->save($file, ["uploadable_section" => "Primary"]);
                                }
                            }
                        }
                    }
                    break;
                case 'LessonTypeVideoPlatform':
                    $chapter_lesson->lesson_icon = LessonTypeVideoPlatform::ICON;
                    $chapter_lesson->save();
                    $lesson_type = LessonTypeVideoPlatform::create([
                        'video_type' => $request->video_platform_video_type,
                        'video_url' => $request->video_platform_video_url,
                        'duration' => $request->video_platform_duration,
                        'content' => $request->video_platform_optional_content,
                    ]);
                    $lesson_type->lesson()->save($chapter_lesson);
                    break;
            }

            $lessons = Lesson::where('chapter_id', $chapter->id)
                ->orderBy("order")->get();

            $order = 1;
            $all_in_draft = true;
            foreach ($lessons as $row) {
                if ($all_in_draft && $row->status == 'Active') {
                    $all_in_draft = false;
                }
                $row->order = $order;
                $row->save();
                $order++;
            }

            $chapter->status = $all_in_draft ? 'Draft' : 'Active';
            $chapter->save();

            DB::commit();
            return Redirect::back()
                ->with('success', 'Lesson added successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Lesson could not be added.');
        }
    }

    public function addChapter(Course $course, ChapterAddSettingsRequest $request)
    {
        DB::beginTransaction();
        try {

            $chapter = new Chapter();
            $chapter->course()->associate($course->id);

            $chapter->title = $request->title;
            $chapter->new_lessons_to_draft = $request->new_lessons_to_draft;

            $chapter->save();

            $chapters = Chapter::where('course_id', $course->id)
                ->orderBy("order")->get();

            $order = 1;
            foreach ($chapters as $row) {
                $row->order = $order;
                $row->save();
                $order++;
            }

            DB::commit();
            return Redirect::back()
                ->with('success', 'Chapter added successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Chapter could not be added.');
        }
    }

    public function destroyLesson(Lesson $lesson, LessonDeleteRequest $request)
    {
        DB::beginTransaction();
        try {

            $lesson->delete();

            DB::commit();
            return Redirect::back()
                ->with('success', 'Lesson deleted successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Lesson could not be deleted.');
        }
    }

    public function destroyChapter(Chapter $chapter, ChapterDeleteRequest $request)
    {
        DB::beginTransaction();
        try {

            $chapter->delete();

            DB::commit();
            return Redirect::back()
                ->with('success', 'Chapter deleted successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'Chapter could not be deleted.');
        }
    }

    public function updateSettings(Course $course, CourseUpdateSettingsRequest $request)
    {

        try {

            $course->title = $request->course_title;
            $course->slug = $request->course_slug;
            $course->instructor_id = $request->course_instructor_id;
            $course->is_private = $request->course_is_private;
            $course->is_hidden = $request->course_is_hidden;

            $course->save();

            return Redirect::back()
                ->with('success', 'Basic settings updated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Basic settings could not be updated.');
        }
    }

    public function settingsCourseCard(Course $course)
    {
        return Inertia::render('Courses/EditCourse/SettingsCourseCard', [
            'course' => new CourseResource($course),
        ]);
    }

    public function updateSettingsCourseCard(Course $course, CourseUpdateSettingsCourseCardRequest $request)
    {

        try {

            $image_name = '';
            if ($course_img = $request->file('course_image')) {
                $image = md5($course->id . '_' . uniqid()) . "." . $course_img->getClientOriginalExtension();
                $course_img->storeAs(Course::IMAGE_PATH, $image);
                $image_name = Course::IMAGE_PATH . "/" . $image;
            }

            if ($image_name == '') {
                if ($course->img != '') {
                    $image_name = $course->img;
                }
            } else {
                if ($course->img != '') {
                    Storage::delete($course->img);
                }
            }

            $course->img = $image_name;
            $course->description_min = $request->course_description;

            $course->save();

            return Redirect::back()
                ->with('success', 'Course card updated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Course card could not be updated.');
        }
    }

    public function settingsCoursePlayer(Course $course)
    {
        return Inertia::render('Courses/EditCourse/SettingsCoursePlayer', [
            'course' => new CourseResource($course),
        ]);
    }

    public function settingsCourseProgress(Course $course)
    {
        return Inertia::render('Courses/EditCourse/SettingsCourseProgress', [
            'course' => new CourseResource($course),
        ]);
    }

    public function settingsCode(Course $course)
    {
        return Inertia::render('Courses/EditCourse/SettingsCode', [
            'course' => new CourseResource($course),
        ]);
    }


    public function settingsAdminsPayees(Course $course)
    {
        return Inertia::render('Courses/EditCourse/SettingsAdminsPayees', [
            'course' => new CourseResource($course),
        ]);
    }

    public function settingsSEO(Course $course)
    {
        return Inertia::render('Courses/EditCourse/SettingsSEO', [
            'course' => new CourseResource($course),
        ]);
    }

    public function updateSettingsSEO(Course $course, CourseUpdateSettingsSEORequest $request)
    {

        try {

            $course->meta_title = $request->meta_title;
            $course->meta_description = $request->meta_description;
            $course->meta_keywords = $request->meta_keywords;

            $course->save();

            return Redirect::back()
                ->with('success', 'SEO settings updated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'SEO settings could not be updated.');
        }
    }

    public function updateSettingsCode(Course $course, CourseUpdateSettingsCodeRequest $request)
    {

        try {

            $course->page_footer_code = $request->page_footer_code;
            $course->save();

            return Redirect::back()
                ->with('success', 'Footer page code settings updated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Footer page code settings could not be updated.');
        }
    }
}
