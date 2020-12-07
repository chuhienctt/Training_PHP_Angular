<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use App\Models\Users;

class AuthenticateController extends Controller {

    public function login() {
        $tai_khoan = request()->tai_khoan;
        $mat_khau = request()->mat_khau;
        
        $user = model('Users')->where(['tai_khoan' => $tai_khoan])->first();

        if($user && Auth::checkPassword($mat_khau, $user->mat_khau)) {

            $user->token = Auth::createToken($user->id);

            $user->save();

            return response()->json([
                'status' => 1,
                'message' => 'Đăng nhập thành công!',
                'data' => $user
            ]);
        } else {
            return response()->json([
                'status' => 2,
                'message' => 'Tài khoản hoặc mật khẩu không chính xác!'
            ]);
        }
    }

    public function register() {
        $tai_khoan = request()->tai_khoan;
        $mat_khau = request()->mat_khau;
        $ho_ten = request()->ho_ten;
        $email = request()->email;
        $so_dien_thoai = request()->so_dien_thoai;
        $dia_chi = request()->dia_chi;
        $ngay_sinh = request()->ngay_sinh;

        $user = model('Users')->where(['tai_khoan' => $tai_khoan])->first();

        if($user) {
            return response()->json([
                'status' => 2,
                'message' => 'Tài khoản này đã tồn tại!'
            ]);
        }

        $user = new Users();

        $user->tai_khoan = $tai_khoan;
        $user->mat_khau = Auth::createPassword($mat_khau);
        $user->ho_ten = $ho_ten;
        $user->email = $email;
        $user->so_dien_thoai = $so_dien_thoai;
        $user->dia_chi = $dia_chi;
        $user->ngay_sinh = $ngay_sinh;
        $user->role = 1;

        $user->save();

        return response()->json([
            'status' => 1,
            'message' => 'Đăng ký thành công!',
            'data' => $user
        ]);
    }

}