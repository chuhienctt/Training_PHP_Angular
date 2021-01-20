<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;

class NhomUsers extends Model {
    protected $table = 'nhom_users';
    protected $timestamp = false;

    public function nhom() {
        return $this->belongsTo('App\Models\Nhom', 'id_nhom');
    }

    public function users() {
        return $this->belongsTo('App\Models\Users', 'id_users');
    }
}