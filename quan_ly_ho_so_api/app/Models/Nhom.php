<?php

namespace App\Models;

use Core\Model;

class Nhom extends Model {
    protected $table = 'nhom';

    public function co_quan() {
        return $this->belongsTo('CoQuan', 'id_co_quan');
    }

    public function users() {
        return $this->hasMany('NhomUsers', 'id_nhom', 'Users', 'id_users');
    }
}