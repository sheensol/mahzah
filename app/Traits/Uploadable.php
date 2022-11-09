<?php

namespace App\Traits;

use App\Models\FileUpload;

trait Uploadable
{
    public function files()
    {
        return $this->morphToMany(FileUpload::class, 'uploadable')
            ->withPivot('uploadable_section')->orderBy('id', 'desc');
    }

    public function delete()
    {
        // $this->files->each(
        //     function ($file) {
        //         $file->delete();
        //     }
        // );

        $this->files()->detach();
        return parent::delete();
    }
}
