<?php

namespace App\Model;

use Core\Model;

class Categories extends Model {
    protected $table = 'categories';

    public function products() {
        return $this->hasMany('Products', 'id_category');
    }
}