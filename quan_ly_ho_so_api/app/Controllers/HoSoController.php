<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\File;
use Core\DB;
use App\Models\HoSo;

class HoSoController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = model('HoSo')->find(request()->id);
        } else {
            $data = model('HoSo')->all();
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = model('HoSo')->offset($first)->limit($row)->get();

        return response()->json([
            'total' => model('HoSo')->count(),
            'data' => $data,
        ]);
    }
}