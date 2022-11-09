<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use SoftDeletes;

    public $table = 'permissions';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'title',
        'display_name',
        'description'
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function scopeAction($query, $action = 'access')
    {
        return $query->where('title', 'like', '%_' . $action);
    }

    public function getNameAttribute()
    {
        $replaces = [
            ' Create' => '',
            ' Access' => '',
            ' Edit' => '',
            ' Delete' => '',
            ' Show' => '',
        ];

        $title = str_replace(array_keys($replaces), array_values($replaces), $this->display_name);

        return $title;
    }
}
