<?php

namespace App\Models;

use Core\Model;

class QuyTrinh extends Model {
    protected $table = 'quy_trinh';

    public function buoc() {
        return $this->hasMany('Buoc', 'id_quy_trinh');
    }
}