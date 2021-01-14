<?php

namespace App\Controller\User;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\File;
use Core\DB;
use App\Models\HoSo;

class HoSoController extends Controller {

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
            'id_quy_trinh' => [
                'required' => 'Thiếu id quy trình',
                'exists:quy_trinh' => 'Không tồn tại quy trình',
            ],
        ]);
    }
}