<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;
use Core\Validator;
use Core\Format;
use Core\DB;
use Core\File;
use App\Models\ThuTuc;
use App\Models\QuyTrinh;
use App\Models\Buoc;

class ThuTucController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = model('ThuTuc')->find(request()->id);

            $data->co_quan = $data->co_quan();
            $data->linh_vuc = $data->linh_vuc();
            $data->quy_trinh = $data->quy_trinh();

        } else {
            $data = model('ThuTuc')->all();

            foreach($data as $tt) {
                $tt->co_quan = $tt->co_quan();
                $tt->linh_vuc = $tt->linh_vuc();
                $tt->quy_trinh = $tt->quy_trinh();
            }
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = model('ThuTuc')->offset($first)->limit($row)->get();

        foreach($data as $tt) {
            $tt->co_quan = $tt->co_quan();
            $tt->linh_vuc = $tt->linh_vuc();
            $tt->quy_trinh = $tt->quy_trinh();
        }

        return response()->json([
            'total' => model('ThuTuc')->count(),
            'data' => $data,
        ]);
    }

    public function get_templates() {
        $temps = getFiles(_ROOT.'/../public/templates/', 'json');

        return response()->json($temps);
    }

    public function create() {
        
        validator()->validate([
            'ten_thu_tuc' => [
                'required' => 'Tên thủ tục không được để trống',
                'max:255' => 'Tên thủ tục  không quá 255 kí tự',
            ],
            'muc_do' => [
                'required' => 'Mức độ không được để trống',
                'numberic' => 'Mức độ không đúng định dạng',
            ],
            'template' => [
                'required' => 'Template không được để trống',
            ],
            'id_co_quan' => [
                'required' => 'Cơ quan không được để trống',
                'exists:co_quan' => 'Cơ quan không tồn tại',
            ],
            'id_linh_vuc' => [
                'required' => 'Lĩnh vực không được để trống',
                'exists:linh_vuc' => 'Lĩnh vực không tồn tại',
            ],
            'quy_trinh' => [
                'required' => 'Quy trình không được để trống',
                'array' => 'Quy trình phải là một mảng',
            ],
        ]);

        if(!File::exists("/templates/".request()->template)) {
            Validator::alert("Template không tồn tại!");
        } else if(!DB::table('co_quan_linh_vuc')->where(['id_co_quan' => request()->id_co_quan, 'id_linh_vuc' => request()->id_linh_vuc])->first()) {
            Validator::alert("Lĩnh vực không thuộc cơ quan đã chọn!");
        }

        $thu_tuc = new ThuTuc();

        $thu_tuc->id_co_quan = request()->id_co_quan;
        $thu_tuc->id_linh_vuc = request()->id_linh_vuc;
        $thu_tuc->ten_thu_tuc = request()->ten_thu_tuc;
        $thu_tuc->muc_do = request()->muc_do;
        $thu_tuc->template = "/templates/".request()->template;

        DB::beginTransaction();
        if($thu_tuc->save()) {
            try {
                // insert quy trinh
                foreach(request()->quy_trinh as $qt) {
                    if(!isset($qt['buoc']) || gettype($qt['buoc']) != 'array') {
                        throw new \PDOException("buoc is not array");
                    }

                    $qt_new = new QuyTrinh();

                    $qt_new->id_thu_tuc = $thu_tuc->id;
                    $qt_new->ten_quy_trinh = $qt['ten_quy_trinh'];
                    $qt_new->ghi_chu = $qt['ghi_chu'];

                    if($qt_new->save()) {

                        // insert buoc
                        foreach($qt['buoc'] as $bc) {
                            $bc_new = new Buoc();

                            $bc_new->id_quy_trinh = $qt_new->id;
                            $bc_new->ten_buoc = $bc['ten_buoc'];
                            $bc_new->ghi_chu = $bc['ghi_chu'];

                            if(!$bc_new->save()) {
                                throw new \PDOException("can not save buoc");
                            }
                        }
                    } else {
                        throw new \PDOException("can not save quy trinh");
                    }
                }

                DB::commit();

                return response()->success(1, 'Thêm thủ tục thành công!', $thu_tuc);
            } catch(\PDOException $e) {
                echo $e;
                DB::rollBack();
            }
        }

        return response()->error(2, 'Thêm thủ tục thất bại!');
    }

    // public function update() {
        
    //     validator()->validate([
    //         'id' => [
    //             'required' => 'Thiếu id cơ quan',
    //             'exists:co_quan' => 'Không tồn tại cơ quan',
    //         ],
    //         'ten_co_quan' => [
    //             'required' => 'Tên cơ quan không được để trống',
    //             'max:255' => 'Tên cơ quan không quá 255 kí tự',
    //             'unique:co_quan' => 'Tên cơ quan đã tồn tại',
    //         ],
    //         'dia_chi' => [
    //             'required' => 'Địa chỉ không được để trống',
    //             'max:255' => 'Địa chỉ không quá 255 kí tự',
    //         ],
    //         'email' => [
    //             'required' => 'Email không được để trống',
    //             'max:100' => 'Email không quá 100 kí tự',
    //             'email' => 'Email không đúng định dạng',
    //             'unique:co_quan' => 'Email này đã tồn tại',
    //         ],
    //         'so_dien_thoai' => [
    //             'required' => 'Số điện thoại không được để trống',
    //             'max:10' => 'Số điện thoại không quá 10 kí tự',
    //             'phone_number' => 'Số điện thoại không đúng định dạng',
    //             'unique:co_quan' => 'Số điện thoại này đã tồn tại',
    //         ],
    //         'ward_id' => [
    //             'required' => 'Xã, phường không được để trống',
    //             'exists:ward' => 'Xã, phường không tồn tại',
    //         ],
    //     ]);

    //     $co_quan = model('CoQuan')->find(request()->id);

    //     if(request()->has('hinh_anh') && !Validator::check('base64', request()->hinh_anh)) {
    //         $file = File::createBase64(request()->hinh_anh);

    //         if(!$file->isImage()) {
    //             Validator::alert("Ảnh không đúng định dạng (png, jpg, jpeg)");
    //         }

    //         $file->generateFileName();
    //         $file->save('/co-quan-images/');

    //         $co_quan->hinh_anh = '/co-quan-images/'.$file->getFileName();
    //     }

    //     $co_quan->ten_co_quan = request()->ten_co_quan;
    //     $co_quan->dia_chi = request()->dia_chi;
    //     $co_quan->email = request()->email;
    //     $co_quan->so_dien_thoai = request()->so_dien_thoai;
    //     $co_quan->ward_id = request()->ward_id;

    //     if($co_quan->save()) {

    //         if(request()->has('linh_vuc') && is_array(request()->linh_vuc)) {

    //             // remove referenced
    //             model('CoQuanLinhVuc')->where([
    //                 'id_co_quan' => $co_quan->id
    //             ])->delete();

    //             // add referenced
    //             foreach(request()->linh_vuc as $option) {
    //                 if(model('LinhVuc')->find($option)) {
    //                     model('CoQuanLinhVuc')->insert([
    //                         'id_linh_vuc' => $option,
    //                         'id_co_quan' => $co_quan->id,
    //                     ]);
    //                 }
    //             }

    //         }

    //         return response()->success(1, 'Sửa cơ quan thành công!', $co_quan);
    //     }

    //     return response()->error(2, 'Sửa cơ quan thất bại!');
    // }

    public function delete() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id thủ tục',
                'exists:thu_tuc' => 'Không tồn tại thủ tục',
            ],
        ]);

        $row = model('ThuTuc')->find(request()->id)->hide();

        if($row) {
            return response()->success(1, 'Xóa thủ tục thành công!');
        }

        return response()->error(2, 'Xóa thủ tục thất bại!');
    }

    public function undelete() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id thủ tục',
                'exists:thu_tuc' => 'Không tồn tại thủ tục',
            ],
        ]);

        $row = model('ThuTuc')->find(request()->id)->show();

        if($row) {
            return response()->success(1, 'Hủy xóa thủ tục thành công!');
        }

        return response()->error(2, 'Hủy xóa thủ tục thất bại!');
    }
}