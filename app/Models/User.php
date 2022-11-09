<?php

namespace App\Models;

use App\Models\Course;
use App\Traits\Photoable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use SoftDeletes, Authenticatable, Authorizable, HasFactory, Photoable;

    const DEFAULT = 0;
    const OWNER = 1;

    public function isOwner(): bool
    {
        return $this->type() === self::OWNER;
    }

    public function isLoggedInUser(): bool
    {
        return $this->id() === Auth::id();
    }

    public function getRoleListAttribute()
    {
        return $this->roles->pluck('title')->implode(', ');
    }

    public function getRoleIdsAttribute()
    {
        return $this->roles->pluck('id');
    }

    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function setPasswordAttribute($password)
    {
        if (!$password) return;

        $this->attributes['password'] = Hash::make($password);
    }

    public function enrollments()
    {
        return $this->belongsToMany(Course::class, 'user_enrollments', 'user_id', 'course_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        })->when($filters['role'] ?? null, function ($query, $role) {
            $query->whereHas('roles', function($query) use ($role) {
                $query->where('id', $role);
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}
