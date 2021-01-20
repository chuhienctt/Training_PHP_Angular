<?php

namespace App\Models\DiaChinh;

use \Illuminate\Database\Eloquent\Model;
use App\Helpers\Format;

class Province extends Model {
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