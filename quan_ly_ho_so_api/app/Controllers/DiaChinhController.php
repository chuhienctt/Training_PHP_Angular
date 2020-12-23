<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\File;
use Core\DB;

class DiaChinhController extends Controller {

    public function getTinh() {
        $data = DB::table('province')->all();

        return response()->json($data);
    }

    public function getHuyen() {
        $id = request()->id ?? '01';

        $data = DB::table('district')->where(['province_id' => $id])->get();
        return response()->json($data);
    }

    public function getXa() {
        $id = request()->id ?? '001';

        $data = DB::table('ward')->where(['district_id' => $id])->get();
        return response()->json($data);
    }

    public function getDiaChi() {
        $id = request()->id ?? '00001';

        $ward = DB::table('ward')->find($id);

        $district = DB::table('district')->find($ward->district_id);

        $province = DB::table('province')->find($district->province_id);

        $list_province = DB::table('province')->all();
        $list_district = DB::table('district')->where(['province_id' => $province->id])->get();
        $list_ward = DB::table('ward')->where(['district_id' => $district->id])->get();

        return response()->json([
            'ward' => $ward,
            'district' => $district,
            'province' => $province,
            'list_province' => $list_province,
            'list_district' => $list_district,
            'list_ward' => $list_ward,
        ]);
    }
    
    public function get_tinh() {
        
        if(request()->has('id')) {
            $data = DB::table('province')->find(request()->id);
        } else {
            $data = DB::table('province')->all();
        }
        
        return response()->json($data);
    }

    public function pagination_tinh() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = DB::table('province')->offset($first)->limit($row)->get();

        return response()->json([
            'total' => DB::table('province')->count(),
            'data' => $data,
        ]);
    }
    
    public function get_huyen() {

        if(request()->has('id')) {
            $data = DB::table('district')->find(request()->id);
        } else if(request()->has('id_province')) {
            $data = DB::table('district')->where(['id_province' => request()->id_province])->get();
        } else {
            $data = DB::table('district')->all();
        }
        
        return response()->json($data);
    }

    public function pagination_huyen() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;
        $id_province = request()->id_province ?? null;

        if($id_province) {
            $data = DB::table('district')->where(['id_province' => $id_province])->offset($first)->limit($row)->get();
        } else {
            $data = DB::table('district')->offset($first)->limit($row)->get();
        }

        return response()->json([
            'total' => DB::table('district')->count(),
            'data' => $data,
        ]);
    }
    
    public function get_xa() {

        if(request()->has('id')) {
            $data = DB::table('ward')->find(request()->id);
        } else if(request()->has('id_district')) {
            $data = DB::table('ward')->where(['id_district' => request()->id_district])->get();
        } else {
            $data = DB::table('ward')->all();
        }
        
        return response()->json($data);
    }

    public function pagination_xa() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;
        $id_district = request()->id_district ?? null;

        if($id_district) {
            $data = DB::table('ward')->where(['id_district' => $id_district])->offset($first)->limit($row)->get();
        } else {
            $data = DB::table('ward')->offset($first)->limit($row)->get();
        }

        return response()->json([
            'total' => DB::table('ward')->count(),
            'data' => $data,
        ]);
    }

    public function create_tinh() {
        
        validator()->validate([
            'name' => [
                'required' => 'Tên tỉnh, thành phố không được để trống',
                'max:45' => 'Tên tỉnh, thành phố không quá 45 kí tự',
                'unique:province' => 'Tên tỉnh, thành phố đã tồn tại',
            ],
            'type' => [
                'required' => 'Loại tỉnh, thành phố không được để trống',
                'max:45' => 'Loại tỉnh, thành phố không quá 45 kí tự',
            ],
        ]);

        $result = DB::table('province')->insert([
            'name' => request()->name,
            'type' => request()->type,
        ]);

        if($result) {
            return response()->success(1, 'Thêm tỉnh, thành phố thành công!');
        }

        return response()->error(2, 'Thêm tỉnh, thành phố thất bại!');
    }

    public function update_tinh() {
        
        validator()->validate([
            'id' => [
                'required' => 'Mã tỉnh, thành phố không được để trống',
                'exists:province' => 'Mã tỉnh, thành phố không tồn tại',
            ],
            'name' => [
                'required' => 'Tên tỉnh, thành phố không được để trống',
                'max:45' => 'Tên tỉnh, thành phố không quá 45 kí tự',
            ],
            'type' => [
                'required' => 'Loại tỉnh, thành phố không được để trống',
                'max:45' => 'Loại tỉnh, thành phố không quá 45 kí tự',
            ],
        ]);

        $result = DB::table('province')->where(['id' => request()->id])
        ->update([
            'name' => request()->name,
            'type' => request()->type,
        ]);

        if($result) {
            return response()->success(1, 'Sửa tỉnh, thành phố thành công!');
        }

        return response()->error(2, 'Sửa tỉnh, thành phố thất bại!');
    }

    public function delete_tinh() {
        
        validator()->validate([
            'id' => [
                'required' => 'Mã tỉnh, thành phố không được để trống',
                'exists:province' => 'Mã tỉnh, thành phố không tồn tại',
            ],
        ]);

        $result = DB::table('province')->where(['id' => request()->id])->hide();

        if($result) {
            return response()->success(1, 'Xóa tỉnh, thành phố thành công!');
        }

        return response()->error(2, 'Xóa tỉnh, thành phố thất bại!');
    }

    public function create_huyen() {
        
        validator()->validate([
            'name' => [
                'required' => 'Tên quận, huyện không được để trống',
                'max:45' => 'Tên quận, huyện không quá 45 kí tự',
                'unique:district' => 'Tên quận, huyện đã tồn tại',
            ],
            'type' => [
                'required' => 'Loại quận, huyện không được để trống',
                'max:45' => 'Loại quận, huyện không quá 45 kí tự',
            ],
            'province_id' => [
                'required' => 'Mã tỉnh, thành phố không được để trống',
                'exists:province' => 'Mã tỉnh, thành phố không tồn tại',
            ],
        ]);

        $result = DB::table('district')->insert([
            'name' => request()->name,
            'type' => request()->type,
            'province_id' => request()->province_id,
        ]);

        if($result) {
            return response()->success(1, 'Thêm quận, huyện thành công!');
        }

        return response()->error(2, 'Thêm quận, huyện thất bại!');
    }

    public function update_huyen() {
        
        validator()->validate([
            'id' => [
                'required' => 'Mã quận, huyện không được để trống',
                'exists:district' => 'Mã quận, huyện không tồn tại',
            ],
            'name' => [
                'required' => 'Tên quận, huyện không được để trống',
                'max:45' => 'Tên quận, huyện không quá 45 kí tự',
            ],
            'type' => [
                'required' => 'Loại quận, huyện không được để trống',
                'max:45' => 'Loại quận, huyện không quá 45 kí tự',
            ],
            'province_id' => [
                'required' => 'Mã tỉnh, thành phố không được để trống',
                'exists:province' => 'Mã tỉnh, thành phố không tồn tại',
            ],
        ]);

        $result = DB::table('district')->where(['id' => request()->id])
        ->update([
            'name' => request()->name,
            'type' => request()->type,
            'province_id' => request()->province_id,
        ]);

        if($result) {
            return response()->success(1, 'Sửa quận, huyện thành công!');
        }

        return response()->error(2, 'Sửa quận, huyện thất bại!');
    }

    public function delete_huyen() {
        
        validator()->validate([
            'id' => [
                'required' => 'Mã quận, huyện không được để trống',
                'exists:district' => 'Mã quận, huyện không tồn tại',
            ],
        ]);

        $result = DB::table('district')->where(['id' => request()->id])->hide();

        if($result) {
            return response()->success(1, 'Xóa quận, huyện thành công!');
        }

        return response()->error(2, 'Xóa quận, huyện thất bại!');
    }

    public function create_xa() {
        
        validator()->validate([
            'name' => [
                'required' => 'Tên xã, phường không được để trống',
                'max:45' => 'Tên xã, phường không quá 45 kí tự',
                'unique:ward' => 'Tên xã, phường đã tồn tại',
            ],
            'type' => [
                'required' => 'Loại xã, phường không được để trống',
                'max:45' => 'Loại xã, phường không quá 45 kí tự',
            ],
            'district_id' => [
                'required' => 'Mã quận, huyện không được để trống',
                'exists:district' => 'Mã quận, huyện không tồn tại',
            ],
        ]);

        $result = DB::table('ward')->insert([
            'name' => request()->name,
            'type' => request()->type,
            'district_id' => request()->district_id,
        ]);

        if($result) {
            return response()->success(1, 'Thêm xã, phường thành công!');
        }

        return response()->error(2, 'Thêm xã, phường thất bại!');
    }

    public function update_xa() {
        
        validator()->validate([
            'id' => [
                'required' => 'Mã xã, phường không được để trống',
                'exists:ward' => 'Mã xã, phường không tồn tại',
            ],
            'name' => [
                'required' => 'Tên xã, phường không được để trống',
                'max:45' => 'Tên xã, phường không quá 45 kí tự',
            ],
            'type' => [
                'required' => 'Loại xã, phường không được để trống',
                'max:45' => 'Loại xã, phường không quá 45 kí tự',
            ],
            'district_id' => [
                'required' => 'Mã quận, huyện không được để trống',
                'exists:district' => 'Mã quận, huyện không tồn tại',
            ],
        ]);

        $result = DB::table('ward')->where(['id' => request()->id])
        ->update([
            'name' => request()->name,
            'type' => request()->type,
            'district_id' => request()->district_id,
        ]);

        if($result) {
            return response()->success(1, 'Sửa xã, phường thành công!');
        }

        return response()->error(2, 'Sửa xã, phường thất bại!');
    }

    public function delete_xa() {
        
        validator()->validate([
            'id' => [
                'required' => 'Mã xã, phường không được để trống',
                'exists:ward' => 'Mã xã, phường không tồn tại',
            ],
        ]);

        $result = DB::table('ward')->where(['id' => request()->id])->hide();

        if($result) {
            return response()->success(1, 'Xóa xã, phường thành công!');
        }

        return response()->error(2, 'Xóa xã, phường thất bại!');
    }
}