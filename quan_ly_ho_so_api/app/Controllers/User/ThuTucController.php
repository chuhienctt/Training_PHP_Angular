<?php

namespace App\Controller\User;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use App\Helpers\Format;
use Core\DB;
use Core\File;
use App\Helpers\Pagination;
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

    public function pagination() {
        $page = request()->page ?? 1;
        $pageSize = request()->pageSize ?? 10;

        $where = [
            'deleted_at' => NULL
        ];

        $co_quan = model('CoQuan')->where($where)->get();

        if(request()->has('id_linh_vuc')) {
            $where['id_linh_vuc'] = request()->id_linh_vuc;
        }

        $model = model('ThuTuc')->where($where);

        if(request()->has('keyword')) {
            $model = $model->orWhere([
                'ten_thu_tuc' => ['LIKE', '%'.request()->keyword.'%']
            ])->orWhere([
                'mo_ta' => ['LIKE', '%'.request()->keyword.'%']
            ]);
        }

        if(request()->has('co_quan') && gettype(request()->co_quan) === 'array') {

            foreach (request()->co_quan as $id) {
                $model = $model->orWhere([
                    'id_co_quan' => $id
                ]);
            }
            
        }

        $paging = Pagination::create($model, $page, $pageSize);

        return response()->json([
            'co_quan' => $co_quan,
            'total' => $paging['total_records'],
            'data' => $paging['data'],
        ]);
    }
}