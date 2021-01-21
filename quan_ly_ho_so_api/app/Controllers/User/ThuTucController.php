<?php

namespace App\Controller\User;

use Core\Controller;
use App\Helpers\Pagination;
use App\Models\ThuTuc;
use App\Models\CoQuan;
use App\Models\LinhVuc;

class ThuTucController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = ThuTuc::find(request()->id);

            $data->co_quan = $data->co_quan;
            $data->linh_vuc = $data->linh_vuc;
            $data->quy_trinh = $data->quy_trinh;

            foreach ($data->quy_trinh as $qt) {
                $qt->buoc = $qt->buoc;
            }

        } else {
            $data = ThuTuc::all();

            foreach($data as $tt) {
                $tt->co_quan = $tt->co_quan;
                $tt->linh_vuc = $tt->linh_vuc;
                $tt->quy_trinh = $tt->quy_trinh;
            }
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $page = request()->page ?? 1;
        $pageSize = request()->pageSize ?? 10;

        $model = ThuTuc::where(['deleted_at' => NULL]);
        
        if(request()->has('id_linh_vuc')) {
            $model = $model->where('id_linh_vuc', request()->id_linh_vuc);
        }
        
        if(request()->has('id_co_quan')) {
            $model = $model->where('id_co_quan', request()->id_co_quan);
        }

        if(request()->has('keyword')) {
            $model = $model->where(function($query) {

                $query->orWhere('ten_thu_tuc', 'like', '%'.request()->keyword.'%')
                ->orWhere('code', 'like', '%'.request()->keyword.'%');
                
            });
        }
        
        if(request()->has('muc_do')) {
            $model = $model->where('muc_do', request()->muc_do);
        }

        $paging = Pagination::create($model, $page, $pageSize);

        return response()->json([
            'total' => $paging['total_records'],
            'data' => $paging['data'],
        ]);
    }
}