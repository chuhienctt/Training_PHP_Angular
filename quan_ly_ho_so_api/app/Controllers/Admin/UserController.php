<?php

namespace App\Controller\Admin;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use App\Helpers\Format;
use Core\File;
use App\Models\Users;
use App\Models\CoQuan;

class UserController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = Users::withTrashed()->find(request()->id);
        } else if(request()->has('id_co_quan')) {
            $data = Users::withTrashed()->where(['id_co_quan' => request()->id_co_quan])->get();
        } else {
            $data = Users::withTrashed()->all();
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = Users::withTrashed()->offset($first)->limit($row)->get();

        return response()->json([
            'total' => Users::withTrashed()->count(),
            'data' => $data,
        ]);
    }

    public function create() {

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
            'ward_id' => [
                'required' => 'Xã, phường không được để trống',
                'exists:ward' => 'Xã, phường không tồn tại',
            ],
            'ngay_sinh' => [
                'required' => 'Ngày sinh không được để trống',
                'date' => 'Ngày không đúng định dạng',
            ],
            'role' => [
                'required' => 'Chức vụ không được để trống',
                'in:1,2,3' => 'Chức vụ không chính xác',
            ],
            'avatar' => [
                'required' => 'Vui lòng chọn một hình ảnh làm avatar',
                'base64' => 'File không đúng định dạng base64',
            ],
        ]);

        $file = File::createBase64(request()->avatar);

        if(!$file->isImage()) {
            Validator::alert("Ảnh không đúng định dạng (png, jpg, jpeg)");
        }

        $file->generateFileName();
        $file->save('/avatar/');

        $user = new Users();

        $user->email = request()->email;
        $user->mat_khau = Auth::createPassword(request()->mat_khau);
        $user->ho_ten = request()->ho_ten;
        $user->so_dien_thoai = request()->so_dien_thoai;
        $user->dia_chi = request()->dia_chi;
        $user->ward_id = request()->ward_id;
        $user->ngay_sinh = Format::toDate(request()->ngay_sinh);
        $user->role = request()->role;

        // add cơ quan khi là cán bộ
        if($user->role == 2) {
            $id_co_quan = request()->id_co_quan;
            $co_quan = CoQuan::withTrashed()->find($id_co_quan);
            if($co_quan) {
                $user->id_co_quan = $id_co_quan;
            } else {
                Validator::alert('Cơ quan không tồn tại!');
            }
        }

        $user->avatar = $file->path;

        if($user->save()) {
            return response()->success(1, 'Thêm người dùng thành công!', $user);
        }

        return response()->error(2, 'Thêm người dùng thất bại!');
    }
    
    public function update() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id người dùng',
                'exists:users' => 'Không tồn tại người dùng',
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
            ],
            'dia_chi' => [
                'required' => 'Địa chỉ không được để trống',
                'max:255' => 'Mật khẩu không quá 255 kí tự',
            ],
            'ward_id' => [
                'required' => 'Xã, phường không được để trống',
                'exists:ward' => 'Xã, phường không tồn tại',
            ],
            'ngay_sinh' => [
                'required' => 'Ngày sinh không được để trống',
                'date' => 'Ngày không đúng định dạng',
            ],
            'role' => [
                'required' => 'Chức vụ không được để trống',
                'in:1,2' => 'Chức vụ không chính xác',
            ],
        ]);

        $user = Users::withTrashed()->find(request()->id);

        // k cho sửa thông tin của admin
        if($user->role == 3) {
            Validator::alert("Không thể chỉnh sửa thông tin người dùng này!");
        }

        if(request()->has('mat_khau')) {
            $user->mat_khau = Auth::createPassword(request()->mat_khau);
        }
        $user->ho_ten = request()->ho_ten;
        $user->so_dien_thoai = request()->so_dien_thoai;
        $user->dia_chi = request()->dia_chi;
        $user->ward_id = request()->ward_id;
        $user->ngay_sinh = Format::toDate(request()->ngay_sinh);
        $user->role = request()->role;

        // update cơ quan khi là cán bộ
        if($user->role == 2) {
            $id_co_quan = request()->id_co_quan;
            $co_quan = CoQuan::withTrashed()->find($id_co_quan);
            if($co_quan) {
                $user->id_co_quan = $id_co_quan;
            } else {
                Validator::alert('Cơ quan không tồn tại!');
            }
        }

        if(request()->has('avatar') && !Validator::check('base64', request()->avatar)) {
            $file = File::createBase64(request()->avatar);

            if(!$file->isImage()) {
                Validator::alert("Ảnh không đúng định dạng (png, jpg, jpeg)");
            }

            $file->generateFileName();
            $file->save('/avatar/');

            $user->avatar = $file->path;
        }

        if($user->save()) {
            return response()->success(1, 'Thay đổi thông tin thành công!', $user);
        }

        return response()->error(2, 'Không thể thay đổi thông tin!');
    }

    public function change($type) {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id người dùng',
                'exists:users' => 'Không tồn tại người dùng',
            ],
        ]);

        $user = Users::withTrashed()->find(request()->id);

        // k cho khóa admin khác
        if($user->role == 3) {
            Validator::alert("Không thể thao tác với người dùng này!");
        }

        if($type == 'hide') {
            $model = $user->hide();
        } else {
            $model = $user->show();
        }

        return response()->success(1, 'Thao tác thành công!');
    }

    public function block() {
        return $this->change('hide');
    }

    public function unblock() {
        return $this->change('show');
    }
}