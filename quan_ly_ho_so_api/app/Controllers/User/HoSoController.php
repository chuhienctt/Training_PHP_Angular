<?php

namespace App\Controller\User;

use Core\Controller;
use Core\File;
use Core\Auth;
use App\Middleware\UserGuard;
use App\Helpers\Template;
use App\Models\HoSo;
use App\Models\QuyTrinh;
use App\Models\ThuTuc;
use App\Models\LinhVuc;

class HoSoController extends Controller {

    public function get_template() {

        $data = [];
        if(request()->has("id_quy_trinh")) {
            $quy_trinh = QuyTrinh::find(request()->id_quy_trinh);

            $data = $this->get_template_object($quy_trinh->template);

            foreach ($data as $key => $value) {
                if($value->type === 'select' && stripos($value->value, 'model:') !== false) {
                    $model = explode(':', $value->value)[1]::all();
                    $value->value = $model;
                }
            }
        }

        return response()->json($data);
    }

    public function get_template_object($name) {
        $data = [];
        if(File::exists("/templates/".$name)) {
            $file = File::get_file("/templates/".$name);
            $data = json_decode($file);
        }
        return $data;
    }

    public function get_ho_so() {
        $user = Auth::get();

        $ho_so = HoSo::where('id_user', $user->id)->get();

        return response()->json($ho_so);
    }

    public function create() {
        
        validator()->validate([
            'id_quy_trinh' => [
                'required' => 'Thiếu id quy trình',
                'exists:quy_trinh' => 'Không tồn tại quy trình',
            ],
        ]);

        $quy_trinh = QuyTrinh::find(request()->id_quy_trinh);
        $thu_tuc = ThuTuc::find($quy_trinh->id_thu_tuc);

        $temp_object = $this->get_template_object($quy_trinh->template);

        Template::validate($temp_object, request()->all());

        $data = Template::get_data($temp_object, request()->all());

        $ho_so = new HoSo();

        $ho_so->id_thu_tuc = $thu_tuc->id;
        $ho_so->id_linh_vuc = $thu_tuc->id_linh_vuc;
        $ho_so->id_quy_trinh = $quy_trinh->id;

        $user = UserGuard::getUserNonMiddleware();
        if($user) {
            $ho_so->id_user = $user->id;
        }

        $ho_so->code = "HS-{$quy_trinh->id}.{$thu_tuc->code}-".date('ymd-His');
        $ho_so->thong_tin = json_encode($data);
        $ho_so->trang_thai = 0;
        $ho_so->ngay_xu_ly = $quy_trinh->thoi_gian_xu_ly;

        if($ho_so->save()) {
            $ho_so->thu_tuc = $thu_tuc;
            $ho_so->thoi_gian_du_kien = date('Y-m-d H:i:s', time() + $ho_so->ngay_xu_ly);

            foreach ($data as $key => $value) {
                if($value->name == 'dia_chi') {
                    $dia_chi = $value;
                }
                if($dia_chi && $value->name == 'ward_id') {
                    $dia_chi->value = $dia_chi->value.", ".DiaChinhController::getDiaChiString($value->value);
                }
                if($value->hide) {
                    unset($value);
                }
            }
            $ho_so->thong_tin = $data;

            return response()->success(1, 'Thêm hồ sơ thành công!', $ho_so);
        }
        return response()->error(2, 'Thêm hồ sơ thất bại!');
    }

    public function update() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id hồ sơ',
                'exists:ho_so' => 'Không tồn tại hồ sơ',
            ],
        ]);

        $ho_so = HoSo::find(request()->id);

        $quy_trinh = QuyTrinh::find(request()->id_quy_trinh);
        $thu_tuc = ThuTuc::find($quy_trinh->id_thu_tuc);

        $temp_object = $this->get_template_object($quy_trinh->template);

        Template::validate($temp_object, request()->all());

        $data = Template::get_data($temp_object, request()->all());

        $ho_so->id_thu_tuc = $thu_tuc->id;
        $ho_so->id_linh_vuc = $thu_tuc->id_linh_vuc;
        $ho_so->id_quy_trinh = $quy_trinh->id;

        $user = UserGuard::getUserNonMiddleware();
        if($user) {
            $ho_so->id_user = $user->id;
        }

        $ho_so->code = "HS-{$quy_trinh->id}.{$thu_tuc->code}-".date('ymd-His');
        $ho_so->thong_tin = json_encode($data);
        $ho_so->trang_thai = 0;
        $ho_so->ngay_xu_ly = $quy_trinh->thoi_gian_xu_ly;

        if($ho_so->save()) {
            return response()->success(1, 'Thêm hồ sơ thành công!', $ho_so);
        }
        return response()->error(2, 'Thêm hồ sơ thất bại!');
    }
}
