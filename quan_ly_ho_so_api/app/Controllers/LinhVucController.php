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
        $data = model('LinhVuc')->all();
        if(request()->has('id')) {
            $data = model('LinhVuc')->find(request()->id);
            $data->co_quan = $data->all_co_quan();
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

        if($linh_vuc->save()) {

            // add referenced
            if(request()->has('co_quan') && is_array(request()->co_quan)) {

                foreach(request()->co_quan as $option) {
                    if(model('CoQuan')->find($option)) {
                        model('CoQuanLinhVuc')->insert([
                            'id_linh_vuc' => $linh_vuc->id,
                            'id_co_quan' => $option,
                        ]);
                    }
                }

            }

            return response()->success(1, 'Thêm lĩnh vực thành công!', $linh_vuc);
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

        if($linh_vuc->save()) {

            if(request()->has('co_quan') && is_array(request()->co_quan)) {

                // remove referenced
                model('CoQuanLinhVuc')->where([
                    'id_linh_vuc' => $linh_vuc->id
                ])->delete();

                // add referenced
                foreach(request()->co_quan as $option) {
                    if(model('CoQuan')->find($option)) {
                        model('CoQuanLinhVuc')->insert([
                            'id_linh_vuc' => $linh_vuc->id,
                            'id_co_quan' => $option,
                        ]);
                    }
                }

            }

            return response()->success(1, 'Sửa lĩnh vực thành công!', $linh_vuc);
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

        $row = model('LinhVuc')->where(['id' => request()->id])->update(['deleted_at' => Format::timeNow()]);

        if($row) {
            return response()->success(1, 'Xóa lĩnh vực thành công!');
        }

        return response()->error(2, 'Xóa lĩnh vực thất bại!');
    }
}