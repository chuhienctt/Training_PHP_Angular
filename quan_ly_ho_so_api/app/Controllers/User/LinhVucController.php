<?php

namespace App\Controller\User;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use App\Helpers\Format;
use Core\File;
use Core\DB;
use App\Models\LinhVuc;

class LinhVucController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = model('LinhVuc')->find(request()->id);

            if($data) {
                $data->co_quan = $data->all_co_quan();
            }

        } else {
            $data = model('LinhVuc')->where(['deleted_at' => NULL])->get();
        }
        
        return response()->json($data);
    }
}