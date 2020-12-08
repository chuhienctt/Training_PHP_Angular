<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use App\Models\Users;

class AuthenticateController extends Controller {

    public function login() {
        $tai_khoan = request()->tai_khoan;
        $mat_khau = request()->mat_khau;
        
        $user = model('Users')->where(['tai_khoan' => $tai_khoan])->first();

        if($user && Auth::checkPassword($mat_khau, $user->mat_khau)) {

            $user->token = Auth::createToken($user->id);

            $user->save();

            return response()->success(1, 'Đăng nhập thành công!', $user);
        } else {
            return response()->error(2, 'Tài khoản hoặc mật khẩu không chính xác!');
        }
    }

    public function register() {

        Validator::validate(request(), [
            'tai_khoan' => [
                'required' => 'Tài khoản không được để trống',
                'max:50' => 'Tài khoản không quá 50 kí tự',
                'min:5' => 'Tài khoản không dưới 50 kí tự',
            ],
            'mat_khau' => [
                'required' => 'Mật khẩu không được để trống',
                'max:255' => 'Mật khẩu không quá 255 kí tự',
                'min:6' => 'Mật khẩu không dưới 50 kí tự',
            ],
            'ho_ten' => [
                'required' => 'Họ tên không được để trống',
                'max:100' => 'Họ tên không quá 100 kí tự',
                'min:3' => 'Họ tên quá ngắn',
            ],
            'email' => [
                'required' => 'Email không được để trống',
                'max:100' => 'Email không quá 100 kí tự',
                'email' => 'Email không đúng định dạng',
            ],
            'so_dien_thoai' => [
                'required' => 'Số điện thoại không được để trống',
                'max:10' => 'Số điện thoại không quá 10 kí tự',
                'phone_number' => 'Số điện thoại không đúng định dạng',
            ],
            'dia_chi' => [
                'required' => 'Địa chỉ không được để trống',
                'max:255' => 'Mật khẩu không quá 255 kí tự',
            ],
        ]);

        $tai_khoan = request()->tai_khoan;
        $mat_khau = request()->mat_khau;
        $ho_ten = request()->ho_ten;
        $email = request()->email;
        $so_dien_thoai = request()->so_dien_thoai;
        $dia_chi = request()->dia_chi;
        $ngay_sinh = request()->ngay_sinh;

        $user = model('Users')->where(['tai_khoan' => $tai_khoan])->first();

        if($user) {
            return response()->error(2, 'Tài khoản này đã tồn tại!');
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

        if($user->save()) {
            return response()->success(1, 'Đăng ký thành công!', $user);
        }

        return response()->error(3, 'Đăng ký thất bại!');
    }

}