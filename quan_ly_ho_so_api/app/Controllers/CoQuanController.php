<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\File;
use Core\DB;
use App\Models\CoQuan;

class CoQuanController extends Controller {

    public function get() {
        $data = model('CoQuan')->all();
        if(request()->has('id')) {
            $data = model('CoQuan')->find(request()->id);
        }
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = model('CoQuan')->offset($first)->limit($row)->get();

        return response()->json([
            'total' => model('CoQuan')->count(),
            'data' => $data,
        ]);
    }

    public function create() {
        
        validator()->validate([
            'ten_co_quan' => [
                'required' => 'Tên cơ quan không được để trống',
                'max:255' => 'Tên cơ quan không quá 255 kí tự',
                'unique:co_quan' => 'Tên cơ quan đã tồn tại',
            ],
            'dia_chi' => [
                'required' => 'Địa chỉ không được để trống',
                'max:255' => 'Địa chỉ không quá 255 kí tự',
            ],
            'email' => [
                'required' => 'Email không được để trống',
                'max:100' => 'Email không quá 100 kí tự',
                'email' => 'Email không đúng định dạng',
                'unique:co_quan' => 'Email này đã tồn tại',
            ],
            'so_dien_thoai' => [
                'required' => 'Số điện thoại không được để trống',
                'max:10' => 'Số điện thoại không quá 10 kí tự',
                'phone_number' => 'Số điện thoại không đúng định dạng',
                'unique:co_quan' => 'Số điện thoại này đã tồn tại',
            ],
        ]);

        $co_quan = new CoQuan();

        $co_quan->ten_co_quan = request()->ten_co_quan;
        $co_quan->dia_chi = request()->dia_chi;
        $co_quan->email = request()->email;
        $co_quan->so_dien_thoai = request()->so_dien_thoai;

        if($co_quan->save()) {

            // add referenced
            if(request()->has('linh_vuc') && is_array(request()->linh_vuc)) {

                foreach(request()->linh_vuc as $option) {
                    if(model('LinhVuc')->find($option)) {
                        model('CoQuanLinhVuc')->insert([
                            'id_linh_vuc' => $option,
                            'id_co_quan' => $co_quan->id,
                        ]);
                    }
                }

            }

            return response()->success(1, 'Thêm cơ quan thành công!', $co_quan);
        }

        return response()->error(2, 'Thêm cơ quan thất bại!');
    }

    public function update() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id cơ quan',
                'exists:co_quan' => 'Không tồn tại cơ quan',
            ],
            'ten_co_quan' => [
                'required' => 'Tên cơ quan không được để trống',
                'max:255' => 'Tên cơ quan không quá 255 kí tự',
                'unique:co_quan' => 'Tên cơ quan đã tồn tại',
            ],
            'dia_chi' => [
                'required' => 'Địa chỉ không được để trống',
                'max:255' => 'Địa chỉ không quá 255 kí tự',
            ],
            'email' => [
                'required' => 'Email không được để trống',
                'max:100' => 'Email không quá 100 kí tự',
                'email' => 'Email không đúng định dạng',
                'unique:co_quan' => 'Email này đã tồn tại',
            ],
            'so_dien_thoai' => [
                'required' => 'Số điện thoại không được để trống',
                'max:10' => 'Số điện thoại không quá 10 kí tự',
                'phone_number' => 'Số điện thoại không đúng định dạng',
                'unique:co_quan' => 'Số điện thoại này đã tồn tại',
            ],
        ]);

        $co_quan = model('CoQuan')->find(request()->id);

        $co_quan->ten_co_quan = request()->ten_co_quan;
        $co_quan->dia_chi = request()->dia_chi;
        $co_quan->email = request()->email;
        $co_quan->so_dien_thoai = request()->so_dien_thoai;

        if($co_quan->save()) {

            if(request()->has('linh_vuc') && is_array(request()->linh_vuc)) {

                // remove referenced
                model('CoQuanLinhVuc')->where([
                    'id_co_quan' => $co_quan->id
                ])->delete();

                // add referenced
                foreach(request()->linh_vuc as $option) {
                    if(model('LinhVuc')->find($option)) {
                        model('CoQuanLinhVuc')->insert([
                            'id_linh_vuc' => $option,
                            'id_co_quan' => $co_quan->id,
                        ]);
                    }
                }

            }

            return response()->success(1, 'Sửa cơ quan thành công!', $co_quan);
        }

        return response()->error(2, 'Sửa cơ quan thất bại!');
    }

    public function delete() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id cơ quan',
                'exists:linh_vuc' => 'Không tồn tại cơ quan',
            ],
        ]);

        $row = model('CoQuan')->where(['id' => request()->id])->update(['deleted_at' => Format::timeNow()]);

        if($row) {
            return response()->success(1, 'Xóa cơ quan thành công!');
        }

        return response()->error(2, 'Xóa cơ quan thất bại!');
    }
}