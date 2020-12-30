<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\File;
use Core\DB;
use App\Models\Nhom;
use App\Models\NhomUsers;

class NhomUsersController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = model('Nhom')->find(request()->id);
            if($data) {
                $data->co_quan = $data->co_quan();
                $data->users = $data->users();
            }
        } else if(request()->has('id_co_quan')) {
            $data = model('Nhom')->where(['id_co_quan' => request()->id_co_quan])->get();

            foreach ($data as $item) {
                $item->co_quan = $item->co_quan();
                $item->users = $item->users();
            }
        } else {
            $data = model('Nhom')->all();
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = model('Nhom')->offset($first)->limit($row)->get();

        foreach ($data as $item) {
            $item->co_quan = $item->co_quan();
            $item->users = $item->users();
        }

        return response()->json([
            'total' => model('Nhom')->count(),
            'data' => $data,
        ]);
    }

    public function create() {
        
        validator()->validate([
            'ten_nhom' => [
                'required' => 'Tên nhóm không được để trống',
                'max:255' => 'Tên nhóm không quá 255 kí tự',
            ],
            'id_co_quan' => [
                'required' => 'Cơ quan không được để trống',
                'exists:co_quan' => 'Cơ quan không tồn tại',
            ],
            'users' => [
                'required' => 'Thành viên nhóm không được để trống',
                'array' => 'Thành viên nhóm phải là một mảng',
            ],
        ]);

        $nhom = new Nhom();

        $nhom->id_co_quan = request()->id_co_quan;
        $nhom->ten_nhom = request()->ten_nhom;

        DB::beginTransaction();

        if($nhom->save()) {

            try {
                // add user
                foreach(request()->users as $user) {

                    $result = model('Users')->where(['id' => $user, 'id_co_quan' => $nhom->id_co_quan, 'role' => 2, 'deleted_at' => null])->first();

                    if(!$result) {
                        throw new \PDOException('Người dùng không hợp lệ!');
                    }

                    $result = model('NhomUsers')->insert([
                        'id_nhom' => $nhom->id,
                        'id_users' => $user,
                    ]);

                    if(!$result) {
                        throw new \PDOException('Thêm thành viên thất bại!');
                    }

                }

                DB::commit();

                return response()->success(1, 'Thêm nhóm thành công!', $nhom);
            } catch(\PDOException $e) {
                DB::rollBack();
                Validator::alert($e);
            }
        }

        return response()->error(2, 'Thêm nhóm thất bại!');
    }

    public function update() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id nhóm',
                'exists:nhom' => 'Không tồn tại nhóm',
            ],
            'ten_nhom' => [
                'required' => 'Tên nhóm không được để trống',
                'max:255' => 'Tên nhóm không quá 255 kí tự',
            ],
            'id_co_quan' => [
                'required' => 'Cơ quan không được để trống',
                'exists:co_quan' => 'Cơ quan không tồn tại',
            ],
            'users' => [
                'required' => 'Thành viên nhóm không được để trống',
                'array' => 'Thành viên nhóm phải là một mảng',
            ],
        ]);

        $nhom = model('Nhom')->find(request()->id);

        $nhom->id_co_quan = request()->id_co_quan;
        $nhom->ten_nhom = request()->ten_nhom;

        DB::beginTransaction();

        if($nhom->save()) {

            try {
                // remove user
                model('NhomUsers')->where([
                    'id_nhom' => $nhom->id
                ])->delete();

                // add user
                foreach(request()->users as $user) {

                    $result = model('Users')->where(['id' => $user, 'id_co_quan' => $nhom->id_co_quan, 'role' => 2, 'deleted_at' => null])->first();

                    if(!$result) {
                        throw new \PDOException('Người dùng không hợp lệ!');
                    }

                    $result = model('NhomUsers')->insert([
                        'id_nhom' => $nhom->id,
                        'id_users' => $user,
                    ]);

                    if(!$result) {
                        throw new \PDOException('Sửa thành viên thất bại!');
                    }

                }

                DB::commit();

                return response()->success(1, 'Sửa nhóm thành công!', $nhom);
            } catch(\PDOException $e) {
                DB::rollBack();
                Validator::alert($e);
            }
        }

        return response()->error(2, 'Sửa nhóm thất bại!');
    }

    public function change($type) {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id nhóm',
                'exists:nhom' => 'Không tồn tại nhóm',
            ],
        ]);

        if($type == 'hide') {
            $model = model('Nhom')->find(request()->id)->hide();
        } else {
            $model = model('Nhom')->find(request()->id)->show();
        }

        if($model) {
            return response()->success(1, 'Thao tác thành công!');
        }

        return response()->error(2, 'Thao tác thất bại!');
    }

    public function delete() {
        return $this->change('hide');
    }

    public function undelete() {
        return $this->change('show');
    }
}