<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Helpers\Format;
use App\Models\CoQuan;

class ThuTuc extends Model {
    use SoftDeletes;
    
    protected $table = 'thu_tuc';

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

    public function linh_vuc() {
        return $this->belongsTo('App\Models\LinhVuc', 'id_linh_vuc');
    }

    public function quy_trinh() {
        return $this->hasMany('App\Models\QuyTrinh', 'id_thu_tuc');
    }
}