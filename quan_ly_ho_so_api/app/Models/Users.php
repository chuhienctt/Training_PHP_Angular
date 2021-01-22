<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Helpers\Format;

class Users extends Model {
    use SoftDeletes;
    
    protected $table = 'users';
    protected $hidden = [
        'mat_khau'
    ];

    public function show() {
        $this->deleted_at = NULL;
        $this->save();
    }

    public function hide() {
        $this->deleted_at = Format::timeNow();
        $this->save();
    }

    public function checkBlock() {
        return $this->deleted_at != NULL;
    }
}