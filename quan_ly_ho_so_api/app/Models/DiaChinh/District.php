<?php

namespace App\Models\DiaChinh;

use \Illuminate\Database\Eloquent\Model;
use App\Helpers\Format;

class District extends Model {
    protected $table = 'district';

    public function show() {
        $this->deleted_at = NULL;
        $this->save();
    }

    public function hide() {
        $this->deleted_at = Format::timeNow();
        $this->save();
    }
}