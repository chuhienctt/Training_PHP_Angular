<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\File;
use Core\DB;
use App\Models\LinhVuc;

class LinhVucController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = model('LinhVuc')->find(request()->id);
            $data->co_quan = $data->all_co_quan();
        } else {
            $data = model('LinhVuc')->all();
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = model('LinhVuc')->offset($first)->limit($row)->get();

        return response()->json([
            'total' => model('LinhVuc')->count(),
            'data' => $data,
        ]);
    }

    public function create() {
        
        validator()->validate([
            'ten_linh_vuc' => [
                'required' => 'Tên lĩnh vực không được để trống',
                'max:200' => 'Tên lĩnh vực không quá 200 kí tự',
                'unique:linh_vuc' => 'Tên lĩnh vực đã tồn tại',
            ],
            'mo_ta' => [
                'max:255' => 'Mô tả không quá 255 kí tự',
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
        $file->save('/linh-vuc-images/');

        $linh_vuc = new LinhVuc();

        $linh_vuc->ten_linh_vuc = request()->ten_linh_vuc;
        $linh_vuc->mo_ta = request()->mo_ta ?? null;
        $linh_vuc->hinh_anh = '/linh-vuc-images/'.$file->getFileName();

        DB::beginTransaction();
        
        if($linh_vuc->save()) {

            // add referenced
            if(request()->has('co_quan') && is_array(request()->co_quan)) {

                try {
                    foreach(request()->co_quan as $option) {
                        if(model('CoQuan')->find($option)) {

                            $result = model('CoQuanLinhVuc')->insert([
                                'id_linh_vuc' => $linh_vuc->id,
                                'id_co_quan' => $option,
                            ]);

                            if(!$result) {
                                throw new \PDOException();
                            }

                        } else {
                            throw new \PDOException();
                        }
                    }

                    DB::commit();

                    return response()->success(1, 'Thêm lĩnh vực thành công!', $linh_vuc);
                } catch(\PDOException $e) {
                    DB::rollBack();
                }
            }
        }

        return response()->error(2, 'Thêm lĩnh vực thất bại!');
    }

    public function update() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id lĩnh vực',
                'exists:linh_vuc' => 'Không tồn tại lĩnh vực',
            ],
            'ten_linh_vuc' => [
                'required' => 'Tên lĩnh vực không được để trống',
                'max:200' => 'Tên lĩnh vực không quá 200 kí tự',
                'unique:linh_vuc' => 'Tên lĩnh vực đã tồn tại',
            ],
            'mo_ta' => [
                'max:255' => 'Mô tả không quá 255 kí tự',
            ],
        ]);

        $linh_vuc = model('LinhVuc')->find(request()->id);

        if(request()->has('hinh_anh') && !Validator::check('base64', request()->hinh_anh)) {
            $file = File::createBase64(request()->hinh_anh);

            if(!$file->isImage()) {
                Validator::alert("Ảnh không đúng định dạng (png, jpg, jpeg)");
            }

            $file->generateFileName();
            $file->save('/linh-vuc-images/');

            $linh_vuc->hinh_anh = '/linh-vuc-images/'.$file->getFileName();
        }

        $linh_vuc->ten_linh_vuc = request()->ten_linh_vuc;
        $linh_vuc->mo_ta = request()->mo_ta ?? null;

        DB::beginTransaction();
        
        if($linh_vuc->save()) {

            // add referenced
            if(request()->has('co_quan') && is_array(request()->co_quan)) {

                try {
                    foreach(request()->co_quan as $option) {
                        if(model('CoQuan')->find($option)) {

                            $result = model('CoQuanLinhVuc')->insert([
                                'id_linh_vuc' => $linh_vuc->id,
                                'id_co_quan' => $option,
                            ]);

                            if(!$result) {
                                throw new \PDOException();
                            }

                        } else {
                            throw new \PDOException();
                        }
                    }

                    DB::commit();

                    return response()->success(1, 'Sửa lĩnh vực thành công!', $linh_vuc);
                } catch(\PDOException $e) {
                    DB::rollBack();
                }
            }
        }

        return response()->error(2, 'Sửa lĩnh vực thất bại!');
    }

    public function delete() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id lĩnh vực',
                'exists:linh_vuc' => 'Không tồn tại lĩnh vực',
            ],
        ]);

        $row = model('LinhVuc')->find(request()->id)->hide();

        if($row) {
            return response()->success(1, 'Xóa lĩnh vực thành công!');
        }

        return response()->error(2, 'Xóa lĩnh vực thất bại!');
    }

    public function undelete() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id lĩnh vực',
                'exists:linh_vuc' => 'Không tồn tại lĩnh vực',
            ],
        ]);

        $row = model('LinhVuc')->find(request()->id)->show();

        if($row) {
            return response()->success(1, 'Hủy xóa lĩnh vực thành công!');
        }

        return response()->error(2, 'Hủy xóa lĩnh vực thất bại!');
    }
}