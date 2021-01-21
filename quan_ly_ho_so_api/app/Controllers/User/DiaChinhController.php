<?php

namespace App\Controller\User;

use Core\Controller;
use App\Models\DiaChinh\Province;
use App\Models\DiaChinh\District;
use App\Models\DiaChinh\Ward;

class DiaChinhController extends Controller {

    public function getTinh() {
        $data = Province::get();

        return response()->json($data);
    }

    public function getHuyen() {
        $id = request()->id ?? '01';

        $data = District::where(['province_id' => $id])->get();
        return response()->json($data);
    }

    public function getXa() {
        $id = request()->id ?? '001';

        $data = Ward::where(['district_id' => $id])->get();
        return response()->json($data);
    }

    public function getDiaChi() {
        $id = request()->id ?? '00001';

        $ward = Ward::find($id);

        $district = District::find($ward->district_id);

        $province = Province::find($district->province_id);

        $list_province = Province::all();
        $list_district = District::where(['province_id' => $province->id])->get();
        $list_ward = Ward::where(['district_id' => $district->id])->get();

        return response()->json([
            'ward' => $ward,
            'district' => $district,
            'province' => $province,
            'list_province' => $list_province,
            'list_district' => $list_district,
            'list_ward' => $list_ward,
        ]);
    }
}