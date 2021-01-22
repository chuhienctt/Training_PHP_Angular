<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Helpers\Format;
use App\Models\CoQuanLinhVuc;
use App\Models\ThuTuc;

class CoQuan extends Model {
    use SoftDeletes;
    
    protected $table = 'co_quan';

    public function show() {
        $this->deleted_at = NULL;
        $this->save();
    }

    public function hide() {
        $this->deleted_at = Format::timeNow();
        $this->save();
    }
    
    public function linh_vuc() {
        return $this->belongsToMany('App\Models\LinhVuc', 'co_quan_linh_vuc', 'id_co_quan', 'id_linh_vuc');
    }
    
    public function count_thu_tuc() {
        return ThuTuc::where('id_co_quan', $this->id)->count();
    }
}