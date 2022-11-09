<?php

namespace App\Models;

use App\Models\User;
// use App\Helpers\FileUpload\FileManager;
use App\Models\Uploadable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FileUpload extends Model
{
    use SoftDeletes;
    const UPLOADABLE_SECTION = [
        'PDF' => ['Primary' => ["pdf"]],
        'Video' => ['Primary' => [
            "mp4", "3gp", "mov", "avi", "wmv"
        ], 'Downloads' => ['*']],
        'Download' => ['Downloads' => ['*']],
        'Audio' => ['Primary' => ["mp2", "mp3", "ogg", "wav", "m4a"]],
        'Bulk' => ['Primary' => ["pdf", "mp4", "3gp", "mov", "avi", "wmv", "mp2", "mp3", "ogg", "wav", "m4a"]]
    ];

    protected $fillable = [
        'filename', 'disk', 'path', 'mimetype', 'ext', 'size', 'url', 'creator_id', 'is_libaray', 'video_thumbnail', 'is_archived'
    ];

    protected $table   = 'files';

    public function creator()
    {
        return $this->belongsTo(User::class);
    }

    public function delete()
    {
        // (new FileManager())->delete($this->disk, $this->path);

        Uploadable::where('file_upload_id', $this->id)->delete();
        return parent::delete();
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('filename', 'like', '%' . $search . '%');
            });
        })->where(function ($query) use ($filters) {
            if (isset($filters['mode']) && $filters['mode'] === 'archived') {
                $query->where('is_archived', true);
            } else {
                $query->where('is_archived', false);
            }
        });
    }
}
