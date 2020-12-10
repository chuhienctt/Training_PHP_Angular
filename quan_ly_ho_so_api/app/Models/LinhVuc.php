<?php

namespace App\Models;

use Core\Model;

class LinhVuc extends Model {
    protected $table = 'linh_vuc';

    public function linh_vucs() {
        return $this->hasMany('CoQuanLinhVuc', 'id_linh_vuc');
    }
}