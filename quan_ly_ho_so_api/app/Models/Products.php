<?php

namespace App\Model;

use Core\Model;

class Products extends Model {
    protected $table = 'products';

    public function category() {
        return $this->belongsTo('Categories', 'id_category');
    }
}