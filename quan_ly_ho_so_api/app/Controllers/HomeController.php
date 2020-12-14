<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use App\Models\Users;

class HomeController extends Controller {

    public function index() {
        return response()->json([
            'welcome' => 'Welcome to NDT API Framework'
        ]);
    }

    public function login() {
        
        validator()->validate([
            'email' => [
                'required' => 'Email không được để trống',
                'max:100' => 'Email không quá 100 kí tự',
                'email' => 'Email không đúng định dạng',
            ],
            'mat_khau' => [
                'required' => 'Mật khẩu không được để trống',
            ],
        ]);

        $email = request()->email;
        $mat_khau = request()->mat_khau;
        
        $user = model('Users')->where(['email' => $email])->first();

        if($user && Auth::checkPassword($mat_khau, $user->mat_khau)) {

            $user->token = Auth::createToken($user->id);

            $user->save();

            return response()->success(1, 'Đăng nhập thành công!', $user);
        }
        return response()->error(2, 'Email hoặc mật khẩu không chính xác!');
    }

    public function register() {

        validator()->validate([
            'email' => [
                'required' => 'Email không được để trống',
                'max:100' => 'Email không quá 100 kí tự',
                'email' => 'Email không đúng định dạng',
                'unique:users' => 'Email này đã tồn tại',
            ],
            'mat_khau' => [
                'required' => 'Mật khẩu không được để trống',
                'max:50' => 'Mật khẩu không quá 50 kí tự',
                'min:8' => 'Mật khẩu không dưới 8 kí tự',
                'password' => 'Mật khẩu phải chứa ít nhất 1 kí tự hoa, 1 kí tự thường, 1 kí tự đặc biệt',
            ],
            'ho_ten' => [
                'required' => 'Họ tên không được để trống',
                'max:100' => 'Họ tên không quá 100 kí tự',
                'min:3' => 'Họ tên quá ngắn',
            ],
            'so_dien_thoai' => [
                'required' => 'Số điện thoại không được để trống',
                'max:10' => 'Số điện thoại không quá 10 kí tự',
                'phone_number' => 'Số điện thoại không đúng định dạng',
                'unique:users' => 'Số điện thoại này đã tồn tại',
            ],
            'dia_chi' => [
                'required' => 'Địa chỉ không được để trống',
                'max:255' => 'Mật khẩu không quá 255 kí tự',
            ],
            'ngay_sinh' => [
                'required' => 'Ngày sinh không được để trống',
                'date' => 'Ngày không đúng định dạng',
            ],
        ]);

        $user = new Users();

        $user->email = request()->email;
        $user->mat_khau = Auth::createPassword(request()->mat_khau);
        $user->ho_ten = request()->ho_ten;
        $user->so_dien_thoai = request()->so_dien_thoai;
        $user->dia_chi = request()->dia_chi;
        $user->ngay_sinh = Format::toDate(request()->ngay_sinh);
        $user->role = 1;
        $user->avatar = "/avatar/no-avavtar.jpg";

        if($user->save()) {
            return response()->success(1, 'Đăng ký thành công!', $user);
        }

        return response()->error(2, 'Đăng ký thất bại!');
    }
    
    public function change_pass() {
        
        validator()->validate([
            'mat_khau_cu' => [
                'required' => 'Mật khẩu cũ không được để trống',
            ],
            'mat_khau_moi' => [
                'required' => 'Mật khẩu mới không được để trống',
                'max:50' => 'Mật khẩu mới không quá 50 kí tự',
                'min:8' => 'Mật khẩu mới không dưới 8 kí tự',
                'password' => 'Mật khẩu mới phải chứa ít nhất 1 kí tự hoa, 1 kí tự thường, 1 kí tự đặc biệt',
            ],
        ]);

        $user = Auth::get();

        if($user) {
            $mat_khau_cu = request()->mat_khau_cu;
            $mat_khau_moi = request()->mat_khau_moi;

            if(Auth::checkPassword($mat_khau_cu, $user->mat_khau)) {

                $user->mat_khau = Auth::createPassword($mat_khau_moi);
                if($user->save()) {
                    return response()->success(1, 'Đổi mật khẩu thành công!');
                }

            } else {
                Validator::alert("Mật khẩu cũ không khớp");
            }
        }

        return response()->error(2, 'Đổi mật khẩu thất bại!');
    }
    
    public function update() {
        
        validator()->validate([
            'ho_ten' => [
                'required' => 'Họ tên không được để trống',
                'max:100' => 'Họ tên không quá 100 kí tự',
                'min:3' => 'Họ tên quá ngắn',
            ],
            'so_dien_thoai' => [
                'required' => 'Số điện thoại không được để trống',
                'max:10' => 'Số điện thoại không quá 10 kí tự',
                'phone_number' => 'Số điện thoại không đúng định dạng',
                'unique:users' => 'Số điện thoại này đã tồn tại',
            ],
            'dia_chi' => [
                'required' => 'Địa chỉ không được để trống',
                'max:255' => 'Mật khẩu không quá 255 kí tự',
            ],
            'ngay_sinh' => [
                'required' => 'Ngày sinh không được để trống',
                'date' => 'Ngày không đúng định dạng',
            ],
        ]);

        $user = Auth::get();

        if($user) {

            $user->ho_ten = request()->ho_ten;
            $user->so_dien_thoai = request()->so_dien_thoai;
            $user->dia_chi = request()->dia_chi;
            $user->ngay_sinh = Format::toDate(request()->ngay_sinh);

            if(request()->has('avatar') && !Validator::check('base64', request()->avatar)) {
                $file = File::createBase64(request()->avatar);
    
                if(!$file->isImage()) {
                    Validator::alert("Ảnh không đúng định dạng (png, jpg, jpeg)");
                }
    
                $file->generateFileName();
                $file->save('/avatar/');
    
                $user->avatar = '/avatar/'.$file->getFileName();
            }

            if($user->save()) {
                return response()->error(1, 'Thay đổi thông tin thành công!');
            }
        }

        return response()->error(2, 'Không thể thay đổi thông tin!');
    }
}
