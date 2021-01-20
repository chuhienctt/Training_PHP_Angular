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

        $where = [
            'deleted_at' => NULL
        ];

        $co_quan = CoQuan::where($where)->get();
        $linh_vuc = NULL;

        if(request()->has('id_linh_vuc')) {
            $where['id_linh_vuc'] = request()->id_linh_vuc;
            $linh_vuc = LinhVuc::find(request()->id_linh_vuc);
        }

        $model = ThuTuc::where($where);

        if(request()->has('keyword')) {
            $model = $model->where(function($query) {

                $query->orWhere('ten_thu_tuc', 'like', '%'.request()->keyword.'%')
                ->orWhere('mo_ta', 'like', '%'.request()->keyword.'%');
                
            });
        }

        if(request()->has('co_quan') && gettype(request()->co_quan) === 'array') {

            $model = $model->where(function($query) {

                foreach (request()->co_quan as $id) {
                    $query->orWhere([
                        'id_co_quan' => $id
                    ]);
                }

            });

        }

        $paging = Pagination::create($model, $page, $pageSize);

        return response()->json([
            'co_quan' => $co_quan,
            'linh_vuc' => $linh_vuc,
            'total' => $paging['total_records'],
            'data' => $paging['data'],
        ]);
    }
}