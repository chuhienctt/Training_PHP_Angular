<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Buoc extends Model {
    use SoftDeletes;
    
    protected $table = 'buoc';
}