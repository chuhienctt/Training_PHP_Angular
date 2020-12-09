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
            'email' => [
                'required' => 'Email không được để trống',
                'max:100' => 'Email không quá 100 kí tự',
                'email' => 'Email không đúng định dạng',
            ],
            'mat_khau' => [
                'required' => 'Mật khẩu không được để trống',
                'max:50' => 'Mật khẩu không quá 50 kí tự',
                'min:8' => 'Mật khẩu không dưới 8 kí tự',
            ],
        ]);

        $email = request()->email;
        $mat_khau = request()->mat_khau;
        
        $user = model('Users')->where([
            'email' => $email,
            'role' => 3,
        ])->first();

        if(!$user) {
            $user = model('Users')->where([
                'email' => $email,
                'role' => 2,
            ])->first();
        }

        if($user && Auth::checkPassword($mat_khau, $user->mat_khau)) {

            $user->token = Auth::createToken($user->id);

            $user->save();

            return response()->success(1, 'Đăng nhập thành công!', $user);
        }
        return response()->error(2, 'Email hoặc mật khẩu không chính xác!');
    }
}