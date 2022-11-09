<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\VideosController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\CourcesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\BundlesController;
use App\Http\Controllers\CoachingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login')->middleware('guest');
Route::post('/login', [LoginController::class, 'login'])->name('login.attempt')->middleware('guest');
Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register')->middleware('guest');
Route::post('/register', [RegisterController::class, 'register'])->middleware('guest');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Images
Route::get('/img/{path}', [ImagesController::class, 'show'])->where('path', '.*');

// Dashboard
Route::get('/', [DashboardController::class, 'index'])->name('dashboard')->middleware('auth');

// Users
Route::get('/users', [UsersController::class, 'index'])->name('users.index')->middleware('auth');
Route::get('/my-profile', [UsersController::class, 'myProfile'])->name('users.myProfile')->middleware('auth');
Route::put('/my-profile', [UsersController::class, 'updateMyProfile'])->name('users.updateMyProfile')->middleware('auth');
Route::get('/users/{user}/edit', [UsersController::class, 'edit'])->name('users.edit')->middleware('auth');
Route::put('/users/{user}', [UsersController::class, 'update'])->name('users.update')->middleware('auth');
Route::get('/users/create', [UsersController::class, "create"])->name('users.create')->middleware('auth');
Route::post('/users', [UsersController::class, "store"])->name('users.store')->middleware('auth');
Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('users.destroy')->middleware('auth');
Route::put('/users/{user}/restore', [UsersController::class, 'restore'])->name('users.restore')->middleware('auth');

// File upload
Route::post('/file-upload', [FileUploadController::class, 'dropzoneFileUpload' ])->name('dropzoneFileUpload')->middleware('auth');
Route::post('/file-archive/{file}', [FileUploadController::class, 'archiveFile' ])->name('files.archiveFile')->middleware('auth');
Route::post('/file-active/{file}', [FileUploadController::class, 'activeFile' ])->name('files.activeFile')->middleware('auth');

// Route::delete('/file-delete/{file}', [FileUploadController::class, 'destroyFile' ])->name('files.destroyFile')->middleware('auth');
Route::get('/file-download/{file}', [FileUploadController::class, 'downloadFile' ])->name('files.downloadFile')->middleware('auth');
Route::get('/file-stream/{file}', [FileUploadController::class, 'streamFile' ])->name('files.streamFile')->middleware('auth');

// Cources
Route::get('/courses', [CourcesController::class, "index"])->name('courses.index')->middleware('auth');
Route::get('/courses/create', [CourcesController::class, "create"])->name('courses.create')->middleware('auth');
Route::post('/courses', [CourcesController::class, "store"])->name('courses.store')->middleware('auth');

Route::get('/courses/{course}/edit', [CourcesController::class, "edit"])->name('courses.edit')->middleware('auth');
Route::post('/courses/{course}/duplicate', [CourcesController::class, "duplicateCourse"])->name('courses.settings.duplicateCourse')->middleware('auth');

Route::put('/courses/{course}/sort-chapters', [CourcesController::class, "sortChapters"])->name('courses.settings.sortChapters')->middleware('auth');
Route::post('/courses/{course}/add-chapter', [CourcesController::class, "addChapter"])->name('courses.settings.addChapter')->middleware('auth');
Route::put('/courses/{chapter}/sort-lessons', [CourcesController::class, "sortLessons"])->name('courses.settings.sortLessons')->middleware('auth');
Route::put('/courses/{chapter}/update-chapter', [CourcesController::class, "updateChapter"])->name('courses.settings.updateChapter')->middleware('auth');
Route::put('/courses/{chapter}/update-chapter-title', [CourcesController::class, "updateChapterTitle"])->name('courses.settings.updateChapterTitle')->middleware('auth');
Route::delete('/courses/{chapter}/delete-chapter', [CourcesController::class, "destroyChapter"])->name('courses.settings.destroyChapter')->middleware('auth');
Route::post('/courses/{chapter}/add-lesson', [CourcesController::class, "addLesson"])->name('courses.settings.addLesson')->middleware('auth');
Route::post('/courses/{chapter}/bulk-upload', [CourcesController::class, 'bulkUpload' ])->name('bulkUpload')->middleware('auth');
Route::delete('/courses/{lesson}/delete-lesson', [CourcesController::class, "destroyLesson"])->name('courses.settings.destroyLesson')->middleware('auth');
Route::put('/courses/{lesson}/update-lesson', [CourcesController::class, "updateLesson"])->name('courses.settings.updateLesson')->middleware('auth');
Route::put('/courses/{lesson}/update-lesson-title', [CourcesController::class, "updateLessonTitle"])->name('courses.settings.updateLessonTitle')->middleware('auth');
Route::put('/courses/{chapter}/copy-lesson', [CourcesController::class, "copyLesson"])->name('courses.settings.copyLesson')->middleware('auth');
Route::delete('/courses/{lesson}/delete-file/{file}', [CourcesController::class, "destroyLessonFile"])->name('courses.settings.destroyLessonFile')->middleware('auth');

Route::get('/courses/{course}/bulk-importer', [CourcesController::class, "bulkImporter"])->name('courses.bulkImporter')->middleware('auth');
Route::get('/courses/{course}/drip', [CourcesController::class, "drip"])->name('courses.drip')->middleware('auth');
Route::get('/courses/{course}/pricing', [CourcesController::class, "pricing"])->name('courses.pricing')->middleware('auth');
Route::put('/courses/{course}/pricing', [CourcesController::class, "updatePricing"])->name('courses.pricing.update')->middleware('auth');

Route::get('/courses/{course}/grade', [CourcesController::class, "grade"])->name('courses.grade')->middleware('auth');

Route::get('/courses/{course}/settings', [CourcesController::class, "settings"])->name('courses.settings')->middleware('auth');
Route::put('/courses/{course}/settings', [CourcesController::class, "updateSettings"])->name('courses.settings.update')->middleware('auth');

Route::get('/courses/{course}/settings/course-card', [CourcesController::class, "settingsCourseCard"])->name('courses.settings.courseCard')->middleware('auth');
Route::put('/courses/{course}/settings/course-card', [CourcesController::class, "updateSettingsCourseCard"])->name('courses.settings.courseCard.update')->middleware('auth');

Route::get('/courses/{course}/settings/course-player', [CourcesController::class, "settingsCoursePlayer"])->name('courses.settings.coursePlayer')->middleware('auth');
Route::get('/courses/{course}/settings/course-progress', [CourcesController::class, "settingsCourseProgress"])->name('courses.settings.courseProgress')->middleware('auth');
Route::get('/courses/{course}/settings/code', [CourcesController::class, "settingsCode"])->name('courses.settings.code')->middleware('auth');
Route::put('/courses/{course}/settings/code', [CourcesController::class, "updateSettingsCode"])->name('courses.settings.code.update')->middleware('auth');

Route::get('/courses/{course}/settings/admins-payees', [CourcesController::class, "settingsAdminsPayees"])->name('courses.settings.adminsPayees')->middleware('auth');

Route::get('/courses/{course}/settings/seo', [CourcesController::class, "settingsSEO"])->name('courses.settings.seo')->middleware('auth');
Route::put('/courses/{course}/settings/seo', [CourcesController::class, "updateSettingsSEO"])->name('courses.settings.seo.update')->middleware('auth');


// Settings
Route::get('/settings', [SettingsController::class, 'index'])->name('settings')->middleware('auth');
Route::get('/settings/site', [SettingsController::class, 'site'])->name('settings.site')->middleware('auth');
Route::get('/settings/learningContent', [SettingsController::class, 'learningContent'])->name('settings.learningContent')->middleware('auth');
Route::get('/settings/payments', [SettingsController::class, 'payments'])->name('settings.payments')->middleware('auth');
Route::get('/settings/ordersAccounts', [SettingsController::class, 'ordersAccounts'])->name('settings.ordersAccounts')->middleware('auth');
Route::get('/settings/codeAnalytics', [SettingsController::class, 'codeAnalytics'])->name('settings.codeAnalytics')->middleware('auth');

// Price Plans
Route::get('/plans', [PlansController::class, 'index'])->name('plans')->middleware('auth');
Route::get('/plans/additionalPlan', [PlansController::class, 'additionalPlan'])->name('plans.additionalPlan')->middleware('auth');
Route::get('/plans/primary_plan', [PlansController::class, 'primary_plan'])->name('plans.primary_plan')->middleware('auth');


// Video library
Route::get('/videos', [VideosController::class, 'index'])->name('videos')->middleware('auth');

// Bundles
Route::get('/bundles', [BundlesController::class, 'index'])->name('bundles')->middleware('auth');


// Coaching
Route::get('/coaching', [CoachingController::class, 'index'])->name('coaching')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});
