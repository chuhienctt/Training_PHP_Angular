<?php

namespace App\Controller\Admin;

use Core\Controller;
use Core\File;
use App\Models\HoSo;

class HoSoController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = HoSo::withTrashed()->find(request()->id);
        } else {
            $data = HoSo::withTrashed()->all();
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = HoSo::withTrashed()->offset($first)->limit($row)->get();

        return response()->json([
            'total' => HoSo::withTrashed()->count(),
            'data' => $data,
        ]);
    }

    public function get_template() {

        $data = [];
        if(request()->has("name")) {
            if(File::exists("/templates/".request()->name)) {
                $file = File::get_file("/templates/".request()->name);
                $data = json_decode($file);
            }
        }

        return response()->json($data);
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
    }
}