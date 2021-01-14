<?php

namespace App\Models;

use Core\Model;

class HoSo extends Model {
    protected $table = 'ho_so';

    public function quy_trinh() {
        return $this->hasMany('QuyTrinh', 'id_quy_trinh');
    }
}