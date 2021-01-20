<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;

class QuyTrinh extends Model {
    protected $table = 'quy_trinh';

    public function buoc() {
        return $this->hasMany('App\Models\Buoc', 'id_quy_trinh');
    }
}