<?php

namespace App\Traits;

use League\Glide\Server;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Storage;

trait Photoable
{
    public function setPhotoAttribute($photo)
    {
        if (!$photo) return;

        $prev_photo_path = $this->attributes['photo_path'];
        $this->attributes['photo_path'] = $photo instanceof UploadedFile ? $photo->store('users') : $photo;

        if (isset($prev_photo_path) &&   $prev_photo_path != $this->attributes['photo_path']) {
            Storage::delete($prev_photo_path);
        }
    }

    public function getPhotoAttribute()
    {
        return $this->photoUrl(['w' => 40, 'h' => 40, 'fit' => 'crop']);
    }

    public function photoUrl(array $attributes)
    {
        if ($this->photo_path) {
            return URL::to(App::make(Server::class)->fromPath($this->photo_path, $attributes));
        }
    }
}
