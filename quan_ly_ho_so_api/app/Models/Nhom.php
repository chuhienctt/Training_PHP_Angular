<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use App\Helpers\Format;

class Nhom extends Model {
    protected $table = 'nhom';

    public function show() {
        $this->deleted_at = NULL;
        $this->save();
    }

    public function hide() {
        $this->deleted_at = Format::timeNow();
        $this->save();
    }

    public function co_quan() {
        return $this->belongsTo('App\Models\CoQuan', 'id_co_quan');
    }
    
    public function users() {
        return $this->belongsToMany('App\Models\Users', 'nhom_users', 'id_nhom', 'id_users');
    }
}