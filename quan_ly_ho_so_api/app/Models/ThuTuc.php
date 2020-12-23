<?php

namespace App\Models;

use Core\Model;

class ThuTuc extends Model {
    protected $table = 'thu_tuc';

    public function co_quan() {
        return $this->belongsTo('CoQuan', 'id_co_quan');
    }

    public function linh_vuc() {
        return $this->belongsTo('LinhVuc', 'id_linh_vuc');
    }

    public function quy_trinh() {
        return $this->hasMany('QuyTrinh', 'id_thu_tuc');
    }
}