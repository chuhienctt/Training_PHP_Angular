<?php

namespace App\Controller;

use Core\Controller;
use App\Models\Users;

class AuthenticateController extends Controller {

    public function login() {
        $tai_khoan = request()->tai_khoan;
        $mat_khau = request()->mat_khau;

        
    }

    public function register() {
        $tai_khoan = request()->tai_khoan;
        $mat_khau = request()->mat_khau;
        $ho_ten = request()->ho_ten;
        $email = request()->email;
        $so_dien_thoai = request()->so_dien_thoai;
        $dia_chi = request()->dia_chi;
        $ngay_sinh = request()->ngay_sinh;

        $user = new Users();

        $user->tai_khoan = $tai_khoan;
        $user->mat_khau = password_hash($mat_khau, PASSWORD_BCRYPT, ["cost" => 10]);
        $user->ho_ten = $ho_ten;
        $user->email = $email;
        $user->so_dien_thoai = $so_dien_thoai;
        $user->dia_chi = $dia_chi;
        $user->ngay_sinh = $ngay_sinh;
        $user->role = 1;

        $user->save();

        return response()->json($user);
    }

}