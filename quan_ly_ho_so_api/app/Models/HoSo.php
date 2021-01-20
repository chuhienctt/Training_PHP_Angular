<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use App\Helpers\Format;

class HoSo extends Model {
    protected $table = 'ho_so';

    public function show() {
        $this->deleted_at = NULL;
        $this->save();
    }

    public function hide() {
        $this->deleted_at = Format::timeNow();
        $this->save();
    }

    public function quy_trinh() {
        return $this->hasMany('App\Models\QuyTrinh', 'id_quy_trinh');
    }
}