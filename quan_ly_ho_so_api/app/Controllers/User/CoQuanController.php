<?php

namespace App\Controller\User;

use Core\Controller;
use Core\Validator;
use Core\File;
use App\Models\CoQuan;
use App\Models\LinhVuc;
use App\Models\CoQuanLinhVuc;
use Illuminate\Database\Capsule\Manager as DB;

class CoQuanController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = CoQuan::find(request()->id);
            $data && $data->linh_vuc = $data->linh_vuc;
        } else {
            $data = CoQuan::all();
            
            foreach ($data as $item) {
                $item->linh_vuc = $item->linh_vuc;

                foreach ($item->linh_vuc as $lv) {
                    $lv->count_tt = $lv->count_thu_tuc($item->id);
                }

                $item->count_tt = $item->count_thu_tuc();
            }
        }
        
        return response()->json($data);
    }
}