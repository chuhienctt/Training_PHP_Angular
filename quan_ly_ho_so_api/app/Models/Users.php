<?php

namespace App\Models;

use Core\Model;

class Users extends Model {
    protected $table = 'users';

    public function checkBlock() {
        return $this->deleted_at && strtotime($this->deleted_at) > time();
    }
}