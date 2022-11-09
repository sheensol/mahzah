<?php

namespace App\Helpers\FileUpload\Abstracts;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Helpers\FileUpload\Contracts\FileUpload as FileUploadContract;

abstract class FileUploadAbstract implements FileUploadContract
{
    /**
     * Default settings
     *
     */
    protected $defaults;

    /**
     * Initialize default settings
     *
     * @return void
     */
    protected function initializeDefaults()
    {
        $this->defaults = [
            'disk' => config('filesystems.default'),
            'directory' => "media",
            'maxFileSize' => (1024*1024*1024), // 1 GB
            'allowedExtensions' => [
                'png', 'jpg', 'jpeg', 'mp4', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'pdf'
            ],
        ];
    }

    /**
     * Handle the uploaded file
     *
     * @param Illuminate\Http\Request $request
     * @param string $fieldName
     * @param array $settings
     *
     * @return array|false
     */
    public function handle(Request $request, $fieldName, $settings = [])
    {
        $settings = array_merge($this->defaults, $settings);

        $validRequestFiles = [];
        if ($request->hasfile($fieldName)) {
            foreach ($request->file($fieldName) as $file) {
                if ($this->uploadValidate($file, $settings)) {
                    $validRequestFiles[] = $file;
                }
            }
        }

        if (count($validRequestFiles) > 0) {
            $uploadedFiles = [];
            foreach ($validRequestFiles as $validRequestFile) {
                $uploadedFiles[] = $this->storeFile($validRequestFile, $settings);
            }

            return $uploadedFiles;
        }

        return false;
    }

    /**
     * Validate the uploaded file for extension & size
     *
     * @return bool
     */
    abstract protected function uploadValidate(UploadedFile $uploadedFile, $settings);

    /**
     * Return the file extension as extracted from the origin file name
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return string
     */
    abstract protected function getExtension(UploadedFile $uploadedFile);

    /**
     * Generate an unique path for storing file from the filename
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return string
     */
    abstract protected function generatePath(UploadedFile $uploadedFile);

    /**
     * Return the original filename
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return string
     */
    abstract protected function getOriginName(UploadedFile $uploadedFile);

    /**
     * Return the file size
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return double
     */
    abstract protected function getFileSize(UploadedFile $uploadedFile);

    /**
     * Physically store the  uploaded file
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     * @param array $settings
     *
     * @return array
     */
    abstract protected function storeFile(UploadedFile $uploadedFile, $settings);
}
