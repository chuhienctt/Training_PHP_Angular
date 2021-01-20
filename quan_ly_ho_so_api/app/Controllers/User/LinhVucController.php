<?php

namespace App\Controller\User;

use Core\Controller;
use App\Models\LinhVuc;

class LinhVucController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = LinhVuc::find(request()->id);
            $data && $data->co_quan = $data->co_quan;

        } else {
            $data = LinhVuc::where(['deleted_at' => NULL])->get();
        }
        
        return response()->json($data);
    }
}