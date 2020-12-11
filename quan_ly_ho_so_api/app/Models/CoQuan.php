<?php

namespace App\Models;

use Core\Model;

class CoQuan extends Model {
    protected $table = 'co_quan';

    public function co_quans() {
        return $this->hasMany('CoQuanLinhVuc', 'id_co_quan');
    }

    public function all_linh_vuc() {
        $data = [];
        foreach($this->hasMany('CoQuanLinhVuc', 'id_co_quan') as $item) {
            $data[] = $item->linh_vuc();
        }
        return $data;
    }
}