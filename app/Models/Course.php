<?php

namespace App\Models;

use League\Glide\Server;
use App\Models\Instructor;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    const IMAGE_PATH = "courses/images";

    protected $guarded = [];

    public function creator()
    {
        return $this->belongsTo(User::class);
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhereHas('instructor', function ($query) use ($search) {
                    $query->where(DB::raw('CONCAT(`first_name`," ",`last_name`)'), 'like', '%' . $search . '%');
                });
        });
    }

    public function getImageAttribute($width = 252, $height = 210)
    {
        return $this->imageUrl(['w' => $width, 'h' => $height, 'fit' => 'crop']);
    }

    public function imageUrl(array $attributes)
    {
        if ($this->img) {
            return URL::to(App::make(Server::class)->fromPath($this->img, $attributes));
        } else {
            return URL::to(App::make(Server::class)->fromPath(self::IMAGE_PATH . "/default-product-card.png", $attributes));
        }
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class, 'course_id')
            ->orderBy('order', 'DESC');
    }
}
