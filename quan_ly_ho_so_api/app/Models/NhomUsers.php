<?php

namespace App\Models;

use Core\Model;

class NhomUsers extends Model {
    protected $table = 'nhom_users';

    public function nhom() {
        return $this->belongsTo('Nhom', 'id_nhom');
    }

    public function users() {
        return $this->belongsTo('Users', 'id_users');
    }
}