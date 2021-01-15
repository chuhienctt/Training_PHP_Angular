<?php

namespace App\Helpers;

use Core\Validator;
use Core\Format;
use Core\File;

class Pagination {
    public static function create($model, $page, $pageSize) {
        $total_records = $model->count();

        $total_page = ceil($total_records / $pageSize);

        $offset = ($page - 1) * $pageSize;

        $data = $model->offset($offset)->limit($pageSize)->get();

        return [
            'total_records' => $total_records,
            'data' => $data
        ];
    }
}