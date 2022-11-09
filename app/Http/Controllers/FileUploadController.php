<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\FileUpload;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Helpers\FileUpload\FileUploader;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Admin\File\FileActiveRequest;
use App\Http\Requests\Admin\File\FileDeleteRequest;
use App\Http\Requests\Admin\File\FileStreamRequest;
use App\Http\Requests\Admin\File\FileUploadRequest;
use App\Http\Requests\Admin\File\FileArchiveRequest;
use App\Http\Requests\Admin\File\FileDownloadRequest;

class FileUploadController extends Controller
{
    public function dropzoneFileUpload(FileUploadRequest $request, FileUploader $fileUploader)
    {
        try {

            $uploadedFiles = $fileUploader->handle($request, 'uploads', [
                'allowedExtensions' => (FileUpload::UPLOADABLE_SECTION)[$request->uploadableSection['name']][$request->uploadableSection['section']]
            ]);

            if (!$uploadedFiles) {
                return Redirect::back()
                    ->with('error', $fileUploader->uploadError);
            }

            $savedFileIds = [];
            foreach ($uploadedFiles as $uploadedKey => $uploadedFile) {
                $savedFile = FileUpload::create(array_merge($uploadedFile, [
                    // 'uploadable_section' => $request->uploadableSection['section'],
                    'is_libaray' => $request->isLibaray,
                    'video_thumbnail' => $request->isLibaray ? $request->thumbnails[$uploadedKey] : NULL,
                    'creator_id' => Auth::id()
                ]));
                $savedFileIds[] = ['id' => $savedFile->id, 'filename' => $savedFile->filename, 'ext' => $savedFile->ext, 'mimetype' => $savedFile->mimetype, 'uploadable_section' => $request->uploadableSection['section']];
            }

            return Redirect::back()->with('data', $savedFileIds);
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'File(s) could not be uploaded.');
        }
    }

    public function destroyFile(FileUpload $file, FileDeleteRequest $request)
    {
        try {

            $file->delete();

            return Redirect::back()
                ->with('success', 'File deleted successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'File could not be deleted.');
        }
    }

    public function archiveFile(FileUpload $file, FileArchiveRequest $request)
    {
        try {

            $file->update([
                'is_archived' => true
            ]);

            return Redirect::back()
                ->with('success', 'File archived successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'File could not be archived.');
        }
    }

    public function activeFile(FileUpload $file, FileActiveRequest $request)
    {
        try {

            $file->update([
                'is_archived' => false
            ]);

            return Redirect::back()
                ->with('success', 'File activated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'File could not be activated.');
        }
    }

    public function downloadFile(FileUpload $file, FileDownloadRequest $request)
    {

        if (Storage::disk($file->disk)->exists($file->path)) {
            return response()->download(
                Storage::disk($file->disk)->path($file->path),
                $file->filename
            );
        }

        return Redirect::back()
            ->with('error', 'File could not be found.');
    }

    public function streamFile(FileUpload $file, FileStreamRequest $request)
    {

        if (Storage::disk($file->disk)->exists($file->path)) {
            $fileFullPath = Storage::disk($file->disk)->path($file->path);

            $headers = [
                'Content-Type' => $file->mimetype,
                'Content-Length' => $file->size,
                'Accept-Ranges' => 'bytes',
                'Content-Range' => 'bytes 0-' . $file->size . '/' . $file->size
            ];

            return response()->stream(function () use ($fileFullPath) {
                readfile($fileFullPath);
            }, 200, $headers);
        }

        return Redirect::back()
            ->with('error', 'File could not be found.');
    }
}
