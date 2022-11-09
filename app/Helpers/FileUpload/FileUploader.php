<?php

namespace App\Helpers\FileUpload;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Helpers\FileUpload\Abstracts\FileUploadAbstract;

class FileUploader extends FileUploadAbstract
{
    /**
     * @var $uploadError
     */
    public $uploadError;

    /**
     * Inject dependencies & initialize default settings
     *
     */
    public function __construct()
    {
        $this->initializeDefaults();
    }

    /**
     * Validate the uploaded file for extension & size
     *
     * @return bool
     */
    protected function uploadValidate(UploadedFile $uploadedFile, $settings)
    {
        if (!$uploadedFile->isValid()) {
            $this->uploadError = $uploadedFile->getErrorMessage();
            return false;
        }

        if (
            !in_array($this->getExtension($uploadedFile), $settings['allowedExtensions'])
            && $settings['allowedExtensions'][0] != "*"
        ) {
            $this->uploadError = "Extension {$this->getExtension($uploadedFile)} is not allowed";
            return false;
        }

        if ($this->getFileSize($uploadedFile) > $settings['maxFileSize']) {
            $this->uploadError = "An upload file cannot exceed {$settings['maxFileSize']} bytes";
            return false;
        }

        return true;
    }

    /**
     * Return the file extension as extracted from the origin file name
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return string
     */
    protected function getExtension(UploadedFile $uploadedFile)
    {
        return strtolower($uploadedFile->getClientOriginalExtension());
    }

    /**
     * Generate an unique path for storing file from the filename
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return string
     */
    protected function generatePath(UploadedFile $uploadedFile)
    {
        $originName = $this->getOriginName($uploadedFile);
        $uniqueString = uniqid(rand(), true) . "_" . $originName . "_" . getmypid() . "_" . gethostname() . "_" . time();
        return md5($uniqueString);
    }

    /**
     * Return the original filename
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return string
     */
    protected function getOriginName(UploadedFile $uploadedFile)
    {
        return $uploadedFile->getClientOriginalName();
    }

    /**
     * Return the mimetype
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return string
     */
    protected function getMimeType(UploadedFile $uploadedFile)
    {
        return $uploadedFile->getClientMimeType();
    }

    /**
     * Return the file size
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     *
     * @return double
     */
    protected function getFileSize(UploadedFile $uploadedFile)
    {
        return $uploadedFile->getSize();
    }

    /**
     * Physically store the  uploaded file
     *
     * @param Illuminate\Http\UploadedFile $uploadedFile
     * @param array $settings
     *
     * @return array
     */
    protected function storeFile(UploadedFile $uploadedFile, $settings)
    {
        $subDirectory = $this->generatePath($uploadedFile);

        $storeLocation = $settings['directory'] . DIRECTORY_SEPARATOR . $subDirectory;

        $path = $uploadedFile->store($storeLocation, $settings['disk']);

        $url = Storage::disk($settings['disk'])->url($path);

        return [
            'filename' => $this->getOriginName($uploadedFile),
            'ext' => $this->getExtension($uploadedFile),
            'mimetype' => $this->getMimeType($uploadedFile),
            'size' => $this->getFileSize($uploadedFile),
            'path' => $path,
            'url' => $url,
            'disk' => $settings['disk']
        ];
    }
}
