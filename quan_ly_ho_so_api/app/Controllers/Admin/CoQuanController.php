<?php

namespace App\Controller\Admin;

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
            $data = CoQuan::withTrashed()->find(request()->id);
            $data && $data->linh_vuc = $data->linh_vuc;
        } else {
            $data = CoQuan::all();
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = CoQuan::withTrashed()->offset($first)->limit($row)->get();

        return response()->json([
            'total' => CoQuan::withTrashed()->count(),
            'data' => $data,
        ]);
    }

    public function create() {
        
        validator()->validate([
            'code' => [
                'required' => 'Mã cơ quan không được để trống',
                'max:255' => 'Mã cơ quan không quá 255 kí tự',
                'unique:co_quan' => 'Mã cơ quan đã tồn tại',
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
            'ward_id' => [
                'required' => 'Xã, phường không được để trống',
                'exists:ward' => 'Xã, phường không tồn tại',
            ],
            'hinh_anh' => [
                'required' => 'Vui lòng chọn một hình ảnh',
                'base64' => 'File không đúng định dạng base64',
            ],
        ]);
        
        $file = File::createBase64(request()->hinh_anh);

        if(!$file->isImage()) {
            Validator::alert("Ảnh không đúng định dạng (png, jpg, jpeg)");
        }

        $file->generateFileName();
        $file->save('/co-quan-images/');

        $co_quan = new CoQuan();

        $co_quan->code = request()->code;
        $co_quan->ten_co_quan = request()->ten_co_quan;
        $co_quan->dia_chi = request()->dia_chi;
        $co_quan->email = request()->email;
        $co_quan->so_dien_thoai = request()->so_dien_thoai;
        $co_quan->hinh_anh = $file->path;
        $co_quan->ward_id = request()->ward_id;

        DB::beginTransaction();

        if($co_quan->save()) {
            
            $linh_vucs = request()->linh_vuc ?? [];

            // add referenced
            try {
                foreach($linh_vucs as $option) {
                    if(LinhVuc::find($option)) {
                        $result = CoQuanLinhVuc::insert([
                            'id_linh_vuc' => $option,
                            'id_co_quan' => $co_quan->id,
                        ]);

                        if(!$result) {
                            throw new \PDOException();
                        }
                    } else {
                        throw new \PDOException();
                    }
                }

                DB::commit();

                return response()->success(1, 'Thêm cơ quan thành công!', $co_quan);
            } catch(\PDOException $e) {
                DB::rollBack();
            }
        }

        return response()->error(2, 'Thêm cơ quan thất bại!');
    }

    public function update() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id cơ quan',
                'exists:co_quan' => 'Không tồn tại cơ quan',
            ],
            'code' => [
                'required' => 'Mã cơ quan không được để trống',
                'max:255' => 'Mã cơ quan không quá 255 kí tự',
                'unique:co_quan' => 'Mã cơ quan đã tồn tại',
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
            ],
            'ward_id' => [
                'required' => 'Xã, phường không được để trống',
                'exists:ward' => 'Xã, phường không tồn tại',
            ],
        ]);

        $co_quan = CoQuan::withTrashed()->find(request()->id);

        if(request()->has('hinh_anh') && !Validator::check('base64', request()->hinh_anh)) {
            $file = File::createBase64(request()->hinh_anh);

            if(!$file->isImage()) {
                Validator::alert("Ảnh không đúng định dạng (png, jpg, jpeg)");
            }

            $file->generateFileName();
            $file->save('/co-quan-images/');

            $co_quan->hinh_anh = $file->path;
        }

        $co_quan->code = request()->code;
        $co_quan->ten_co_quan = request()->ten_co_quan;
        $co_quan->dia_chi = request()->dia_chi;
        $co_quan->email = request()->email;
        $co_quan->so_dien_thoai = request()->so_dien_thoai;
        $co_quan->ward_id = request()->ward_id;

        DB::beginTransaction();

        if($co_quan->save()) {

            $linh_vucs = request()->linh_vuc ?? [];

            try {
                // remove referenced
                CoQuanLinhVuc::where([
                    'id_co_quan' => $co_quan->id
                ])->delete();

                // add referenced
                foreach($linh_vucs as $option) {
                    if(LinhVuc::find($option)) {
                        $result = CoQuanLinhVuc::insert([
                            'id_linh_vuc' => $option,
                            'id_co_quan' => $co_quan->id,
                        ]);

                        if(!$result) {
                            throw new \PDOException();
                        }
                    } else {
                        throw new \PDOException();
                    }
                }

                DB::commit();

                return response()->success(1, 'Sửa cơ quan thành công!', $co_quan);
            } catch(\PDOException $e) {
                DB::rollBack();
            }
        }

        return response()->error(2, 'Sửa cơ quan thất bại!');
    }

    public function change($type) {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id cơ quan',
                'exists:co_quan' => 'Không tồn tại cơ quan',
            ],
        ]);

        if($type == 'hide') {
            $model = CoQuan::withTrashed()->find(request()->id)->hide();
        } else {
            $model = CoQuan::withTrashed()->find(request()->id)->show();
        }

        return response()->success(1, 'Thao tác thành công!');
    }

    public function delete() {
        return $this->change('hide');
    }

    public function undelete() {
        return $this->change('show');
    }
}