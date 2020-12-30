<?php

namespace App\Models;

use Core\Model;

class Users extends Model {
    protected $table = 'users';
    protected $hidden = [
        'mat_khau'
    ];

    public function checkBlock() {
        return $this->deleted_at != NULL;
    }
}