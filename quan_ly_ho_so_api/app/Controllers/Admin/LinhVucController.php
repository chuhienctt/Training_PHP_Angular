<?php

namespace App\Controller\Admin;

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
            'code' => [
                'required' => 'Mã lĩnh vực không được để trống',
                'max:255' => 'Mã lĩnh vực không quá 255 kí tự',
                'unique:linh_vuc' => 'Mã lĩnh vực đã tồn tại',
            ],
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
            'icon' => [
                'required' => 'Vui lòng chọn một hình ảnh',
            ],
        ]);
        
        $file = File::createBase64(request()->hinh_anh);

        if(!$file->isImage()) {
            Validator::alert("Ảnh không đúng định dạng (png, jpg, jpeg)");
        }

        $file->generateFileName();
        $file->save('/linh-vuc-images/');

        $linh_vuc = new LinhVuc();

        $linh_vuc->code = request()->code;
        $linh_vuc->ten_linh_vuc = request()->ten_linh_vuc;
        $linh_vuc->mo_ta = request()->mo_ta ?? null;
        $linh_vuc->icon = request()->icon;
        $linh_vuc->hinh_anh = '/linh-vuc-images/'.$file->getFileName();

        DB::beginTransaction();
        
        if($linh_vuc->save()) {

            $co_quans = request()->co_quan ?? [];

            // add referenced
            try {
                foreach($co_quans as $option) {
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

        return response()->error(2, 'Thêm lĩnh vực thất bại!');
    }

    public function update() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id lĩnh vực',
                'exists:linh_vuc' => 'Không tồn tại lĩnh vực',
            ],
            'code' => [
                'required' => 'Mã lĩnh vực không được để trống',
                'max:255' => 'Mã lĩnh vực không quá 255 kí tự',
                'unique:linh_vuc' => 'Mã lĩnh vực đã tồn tại',
            ],
            'ten_linh_vuc' => [
                'required' => 'Tên lĩnh vực không được để trống',
                'max:200' => 'Tên lĩnh vực không quá 200 kí tự',
                'unique:linh_vuc' => 'Tên lĩnh vực đã tồn tại',
            ],
            'mo_ta' => [
                'max:255' => 'Mô tả không quá 255 kí tự',
            ],
            'icon' => [
                'required' => 'Vui lòng chọn một hình ảnh',
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

        $linh_vuc->code = request()->code;
        $linh_vuc->ten_linh_vuc = request()->ten_linh_vuc;
        $linh_vuc->mo_ta = request()->mo_ta ?? null;
        $linh_vuc->icon = request()->icon;

        DB::beginTransaction();
        
        if($linh_vuc->save()) {

            $co_quans = request()->co_quan ?? [];

            try {
                // remove referenced
                model('CoQuanLinhVuc')->where([
                    'id_linh_vuc' => $linh_vuc->id
                ])->delete();

                // add referenced
                foreach($co_quans as $option) {
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

        return response()->error(2, 'Sửa lĩnh vực thất bại!');
    }

    public function change($type) {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id lĩnh vực',
                'exists:linh_vuc' => 'Không tồn tại lĩnh vực',
            ],
        ]);

        if($type == 'hide') {
            $model = model('LinhVuc')->find(request()->id)->hide();
        } else {
            $model = model('LinhVuc')->find(request()->id)->show();
        }

        if($model) {
            return response()->success(1, 'Thao tác thành công!');
        }

        return response()->error(2, 'Thao tác thất bại!');
    }

    public function delete() {
        return $this->change('hide');
    }

    public function undelete() {
        return $this->change('show');
    }
}