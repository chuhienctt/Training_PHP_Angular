<?php

namespace App\Models\DiaChinh;

use \Illuminate\Database\Eloquent\Model;
use App\Helpers\Format;
use Illuminate\Database\Eloquent\SoftDeletes;

class Province extends Model {
    use SoftDeletes;
    
    protected $table = 'province';

    public function show() {
        $this->deleted_at = NULL;
        $this->save();
    }

    public function hide() {
        $this->deleted_at = Format::timeNow();
        $this->save();
    }
}