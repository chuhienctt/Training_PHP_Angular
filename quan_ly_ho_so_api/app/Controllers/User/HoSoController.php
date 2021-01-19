<?php

namespace App\Controller\User;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use App\Helpers\Format;
use Core\File;
use Core\DB;
use App\Helpers\Template;
use App\Models\HoSo;
use App\Models\QuyTrinh;

class HoSoController extends Controller {

    public function get_template() {

        $data = [];
        if(request()->has("name")) {
            $data = $this->get_template_object(request()->name);
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

    public function create() {
        
        validator()->validate([
            'id_quy_trinh' => [
                'required' => 'Thiếu id quy trình',
                'exists:quy_trinh' => 'Không tồn tại quy trình',
            ],
        ]);

        $quy_trinh = model('QuyTrinh')->find(request()->id_quy_trinh);

        $temp_object = $this->get_template_object($quy_trinh->template);

        Template::validate($temp_object, request()->all());

        $data = Template::get_data($temp_object, request()->all());

        $ho_so = new HoSo();

        $ho_so->id_quy_trinh = request()->id_quy_trinh;
        $ho_so->code = 'HS'.time().mt_rand(0, 9);
        $ho_so->thong_tin = json_encode($data);
        $ho_so->trang_thai = 0;

        if($ho_so->save()) {
            return response()->success(1, 'Thêm hồ sơ thành công!', $ho_so);
        }
        return response()->error(2, 'Thêm hồ sơ thất bại!');
    }
}