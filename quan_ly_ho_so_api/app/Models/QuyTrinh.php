<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuyTrinh extends Model {
    use SoftDeletes;
    
    protected $table = 'quy_trinh';

    public function buoc() {
        return $this->hasMany('App\Models\Buoc', 'id_quy_trinh');
    }
}