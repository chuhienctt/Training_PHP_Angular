<?php

namespace App\Models;

use Core\Model;

class CoQuanLinhVuc extends Model {
    protected $table = 'co_quan_linh_vuc';

    public function co_quan() {
        return $this->belongsTo('CoQuan', 'id_co_quan');
    }
}