<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\File;
use Core\DB;

class DiaChinhController extends Controller {

    public function getTinh() {
        $data = DB::table('province')->all();
        return response()->json($data);
    }

    public function getHuyen() {
        $id = request()->id ?? '01';

        $data = DB::table('district')->where(['province_id' => $id])->get();
        return response()->json($data);
    }

    public function getXa() {
        $id = request()->id ?? '001';

        $data = DB::table('ward')->where(['district_id' => $id])->get();
        return response()->json($data);
    }

    public function getDiaChi() {
        $id = request()->id ?? '00001';

        $ward = DB::table('ward')->find($id);

        $district = DB::table('district')->find($ward->district_id);

        $province = DB::table('province')->find($district->province_id);

        return response()->json([
            'ward' => $ward,
            'district' => $district,
            'province' => $province,
        ]);
    }
}