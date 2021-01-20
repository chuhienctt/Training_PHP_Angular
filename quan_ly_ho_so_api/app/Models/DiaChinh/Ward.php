<?php

namespace App\Models\DiaChinh;

use \Illuminate\Database\Eloquent\Model;
use App\Helpers\Format;

class Ward extends Model {
    protected $table = 'ward';

    public function show() {
        $this->deleted_at = NULL;
        $this->save();
    }

    public function hide() {
        $this->deleted_at = Format::timeNow();
        $this->save();
    }
}