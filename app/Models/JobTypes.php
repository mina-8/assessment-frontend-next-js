<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobTypes extends Model
{
    protected $fillable =[
        'location',
        'type',
        'salary_range'
    ];
}
