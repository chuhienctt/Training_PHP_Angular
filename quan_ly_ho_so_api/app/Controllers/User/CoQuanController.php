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
            }
        }
        
        return response()->json($data);
    }
}