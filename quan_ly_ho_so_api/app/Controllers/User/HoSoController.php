<?php

namespace App\Controller\User;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\File;
use Core\DB;
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
        if(File::exists("/templates/".request()->name)) {
            $file = File::get_file("/templates/".request()->name);
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

        
    }
}