<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use App\Helpers\Format;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ThuTuc;

class LinhVuc extends Model {
    use SoftDeletes;
    
    protected $table = 'linh_vuc';

    public function show() {
        $this->deleted_at = NULL;
        $this->save();
    }

    public function hide() {
        $this->deleted_at = Format::timeNow();
        $this->save();
    }

    public function co_quan() {
        return $this->belongsToMany('App\Models\CoQuan', 'co_quan_linh_vuc', 'id_linh_vuc', 'id_co_quan');
    }
    
    public function count_thu_tuc($id_co_quan) {
        return ThuTuc::where([
            'id_co_quan' => $id_co_quan,
            'id_linh_vuc' => $this->id
        ])->count();
    }
}