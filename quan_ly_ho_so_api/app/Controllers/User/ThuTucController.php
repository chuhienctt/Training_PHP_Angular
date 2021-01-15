<?php

namespace App\Controller\User;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\DB;
use Core\File;
use App\Models\ThuTuc;
use App\Models\QuyTrinh;
use App\Models\Buoc;

class ThuTucController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = model('ThuTuc')->find(request()->id);

            $data->co_quan = $data->co_quan();
            $data->linh_vuc = $data->linh_vuc();
            $data->quy_trinh = $data->quy_trinh();

            foreach ($data->quy_trinh as $qt) {
                $qt->buoc = $qt->buoc();
            }

        } else if(request()->has('id_linh_vuc')) {

            $data = model('ThuTuc')->where(['id_linh_vuc' => request()->id_linh_vuc, 'deleted_at' => NULL])->get();

            // $data->co_quan = $data->co_quan();
            // $data->linh_vuc = $data->linh_vuc();
            // $data->quy_trinh = $data->quy_trinh();

            // foreach ($data->quy_trinh as $qt) {
            //     $qt->buoc = $qt->buoc();
            // }

        } else {
            $data = model('ThuTuc')->all();

            // foreach($data as $tt) {
            //     $tt->co_quan = $tt->co_quan();
            //     $tt->linh_vuc = $tt->linh_vuc();
            //     $tt->quy_trinh = $tt->quy_trinh();
            // }
        }
        
        return response()->json($data);
    }
}