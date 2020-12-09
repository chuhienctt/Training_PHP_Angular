<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use App\Models\Users;

class AdminController extends Controller {

    public function login() {
        validator()->validate([
            'tai_khoan' => [
                'required' => 'Tài khoản không được để trống',
                'max:50' => 'Tài khoản không quá 50 kí tự',
                'min:8' => 'Tài khoản không dưới 8 kí tự',
            ],
            'mat_khau' => [
                'required' => 'Mật khẩu không được để trống',
                'max:50' => 'Mật khẩu không quá 50 kí tự',
                'min:8' => 'Mật khẩu không dưới 8 kí tự',
            ],
        ]);

        $tai_khoan = request()->tai_khoan;
        $mat_khau = request()->mat_khau;
        
        $user = model('Users')->where([
            'tai_khoan' => $tai_khoan,
            'role' => 3,
        ])->first();

        if($user && Auth::checkPassword($mat_khau, $user->mat_khau)) {

            $user->token = Auth::createToken($user->id);

            $user->save();

            return response()->success(1, 'Đăng nhập thành công!', $user);
        }
        return response()->error(2, 'Tài khoản hoặc mật khẩu không chính xác!');
    }
}