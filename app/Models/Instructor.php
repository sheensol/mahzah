<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Photoable;

class Instructor extends Model
{
    use Photoable;
        
    protected $table = 'instructors';
    protected $guarded = [];

    public function getNameAttribute()
    {
        return $this->first_name.' '.$this->last_name;
    }

}
