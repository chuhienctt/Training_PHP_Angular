<?php

namespace App\Controller\Admin;

use Core\Controller;
use Core\Validator;
use App\Helpers\Format;
use Core\File;
use App\Models\ThuTuc;
use App\Models\QuyTrinh;
use App\Models\Buoc;
use Illuminate\Database\Capsule\Manager as DB;

class ThuTucController extends Controller {

    public function get() {
        
        if(request()->has('id')) {
            $data = ThuTuc::find(request()->id);
            $data->co_quan = $data->co_quan;
            $data->linh_vuc = $data->linh_vuc;
            $data->quy_trinh = $data->quy_trinh;

            foreach ($data->quy_trinh as $qt) {
                $qt->buoc = $qt->buoc;
            }

        } else {
            $data = ThuTuc::all();

            foreach($data as $tt) {
                $tt->co_quan = $tt->co_quan;
                $tt->linh_vuc = $tt->linh_vuc;
                $tt->quy_trinh = $tt->quy_trinh;
            }
        }
        
        return response()->json($data);
    }

    public function pagination() {
        $first = request()->first ?? 0;
        $row = request()->row ?? 10;

        $data = ThuTuc::offset($first)->limit($row)->get();

        foreach($data as $tt) {
            $tt->co_quan = $tt->co_quan;
            $tt->linh_vuc = $tt->linh_vuc;
            $tt->quy_trinh = $tt->quy_trinh;
        }

        return response()->json([
            'total' => ThuTuc::count(),
            'data' => $data,
        ]);
    }

    public function get_templates() {
        $temps = getFiles(_ROOT.'/../public/templates/', 'json');

        $data = [];
        foreach($temps as $tm) {
            $data[] = $tm;
        }

        return response()->json($data);
    }

    public function create() {
        
        validator()->validate([
            'code' => [
                'required' => 'Mã thủ tục không được để trống',
                'max:255' => 'Mã thủ tục không quá 255 kí tự',
                'unique:thu_tuc' => 'Mã thủ tục đã tồn tại',
            ],
            'ten_thu_tuc' => [
                'required' => 'Tên thủ tục không được để trống',
                'max:255' => 'Tên thủ tục  không quá 255 kí tự',
            ],
            'muc_do' => [
                'required' => 'Mức độ không được để trống',
                'numberic' => 'Mức độ không đúng định dạng',
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

        if(!DB::table('co_quan_linh_vuc')->where(['id_co_quan' => request()->id_co_quan, 'id_linh_vuc' => request()->id_linh_vuc])->first()) {
            Validator::alert("Lĩnh vực không thuộc cơ quan đã chọn!");
        }

        $thu_tuc = new ThuTuc();

        $thu_tuc->code = request()->code;
        $thu_tuc->id_co_quan = request()->id_co_quan;
        $thu_tuc->id_linh_vuc = request()->id_linh_vuc;
        $thu_tuc->ten_thu_tuc = request()->ten_thu_tuc;
        $thu_tuc->muc_do = request()->muc_do;
        $thu_tuc->mo_ta = request()->mo_ta;

        DB::beginTransaction();
        if($thu_tuc->save()) {
            try {
                // check quy trinh
                if(count(request()->quy_trinh) == 0) {
                    throw new \PDOException("Quy trình không được rỗng");
                }

                // insert quy trinh
                foreach(request()->quy_trinh as $qt) {
                    // validate
                    if(!isset($qt['buoc']) || gettype($qt['buoc']) != 'array') {
                        throw new \PDOException("Bước phải là một mảng");
                    } else if(Validator::check('required', $qt['ten_quy_trinh'] ?? NULL)) {
                        throw new \PDOException("Tên quy trình không được để trống");
                    } else if(Validator::check('required', $qt['ghi_chu'] ?? NULL)) {
                        throw new \PDOException("Ghi chú không được để trống");
                    } else if(!isset($qt['template']) || !File::exists("/templates/".$qt['template'])) {
                        Validator::alert("Template không tồn tại!");
                    } else if(Validator::check('required', $qt['thoi_gian_xu_ly'] ?? NULL)) {
                        throw new \PDOException("Thời gian xử lý không được để trống");
                    }

                    $qt_new = new QuyTrinh();

                    $qt_new->id_thu_tuc = $thu_tuc->id;
                    $qt_new->ten_quy_trinh = $qt['ten_quy_trinh'];
                    $qt_new->ghi_chu = $qt['ghi_chu'];
                    $qt_new->template = $qt['template'];
                    $qt_new->thoi_gian_xu_ly = $qt['thoi_gian_xu_ly'];

                    if($qt_new->save()) {

                        // check buoc
                        if(count($qt['buoc']) == 0) {
                            throw new \PDOException("Bước không được rỗng");
                        }

                        // insert buoc
                        foreach($qt['buoc'] as $bc) {
                            if(Validator::check('required', $bc['ten_buoc'] ?? NULL)) {
                                throw new \PDOException("Tên bước không được để trống");
                            } else if(Validator::check('required', $bc['ghi_chu'] ?? NULL)) {
                                throw new \PDOException("Ghi chú không được để trống");
                            }

                            $bc_new = new Buoc();

                            $bc_new->id_quy_trinh = $qt_new->id;
                            $bc_new->id_nhom = $bc['id_nhom'];
                            $bc_new->ten_buoc = $bc['ten_buoc'];
                            $bc_new->ghi_chu = $bc['ghi_chu'];

                            if(!$bc_new->save()) {
                                throw new \PDOException("Không thể thêm bước");
                            }
                        }
                    } else {
                        throw new \PDOException("Không thể thêm quy trình");
                    }
                }

                DB::commit();

                return response()->success(1, 'Thêm thủ tục thành công!', $thu_tuc);
            } catch(\PDOException $e) {
                DB::rollBack();
                Validator::alert($e->getMessage());
            }
        }

        return response()->error(2, 'Thêm thủ tục thất bại!');
    }

    public function update() {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id thủ tục',
                'exists:thu_tuc' => 'Không tồn tại thủ tục',
            ],
            'code' => [
                'required' => 'Mã thủ tục không được để trống',
                'max:255' => 'Mã thủ tục không quá 255 kí tự',
                'unique:thu_tuc' => 'Mã thủ tục đã tồn tại',
            ],
            'ten_thu_tuc' => [
                'required' => 'Tên thủ tục không được để trống',
                'max:255' => 'Tên thủ tục  không quá 255 kí tự',
            ],
            'muc_do' => [
                'required' => 'Mức độ không được để trống',
                'numberic' => 'Mức độ không đúng định dạng',
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

        if(!DB::table('co_quan_linh_vuc')->where(['id_co_quan' => request()->id_co_quan, 'id_linh_vuc' => request()->id_linh_vuc])->first()) {
            Validator::alert("Lĩnh vực không thuộc cơ quan đã chọn!");
        }

        $thu_tuc = ThuTuc::find(request()->id);

        $thu_tuc->code = request()->code;
        $thu_tuc->id_co_quan = request()->id_co_quan;
        $thu_tuc->id_linh_vuc = request()->id_linh_vuc;
        $thu_tuc->ten_thu_tuc = request()->ten_thu_tuc;
        $thu_tuc->muc_do = request()->muc_do;
        $thu_tuc->mo_ta = request()->mo_ta;

        DB::beginTransaction();
        if($thu_tuc->save()) {
            try {
                // check quy trinh
                if(count(request()->quy_trinh) == 0) {
                    throw new \PDOException("Quy trình không được rỗng");
                }

                // insert quy trinh
                foreach(request()->quy_trinh as $qt) {
                    
                    if(!isset($qt['buoc']) || gettype($qt['buoc']) != 'array') {
                        throw new \PDOException("Bước phải là một mảng");
                    } else if(Validator::check('required', $qt['ten_quy_trinh'] ?? NULL)) {
                        throw new \PDOException("Tên quy trình không được để trống");
                    } else if(Validator::check('required', $qt['ghi_chu'] ?? NULL)) {
                        throw new \PDOException("Ghi chú không được để trống");
                    } else if(!isset($qt['template']) || !File::exists("/templates/".$qt['template'])) {
                        Validator::alert("Template không tồn tại!");
                    } else if(Validator::check('required', $qt['thoi_gian_xu_ly'] ?? NULL)) {
                        throw new \PDOException("Thời gian xử lý không được để trống");
                    }

                    if(isset($qt['id'])) {
                        // update

                        if(Validator::check('exists:quy_trinh', $qt['id'] ?? NULL)) {
                            throw new \PDOException("Quy trình không tồn tại");
                        }

                        $qt_new = QuyTrinh::find($qt['id']);
    
                        $qt_new->ten_quy_trinh = $qt['ten_quy_trinh'];
                        $qt_new->ghi_chu = $qt['ghi_chu'];
                        $qt_new->template = $qt['template'];
                        $qt_new->thoi_gian_xu_ly = $qt['thoi_gian_xu_ly'];
                        $qt_new->deleted_at = isset($qt['deleted_at']) && $qt['deleted_at'] ? Format::timeNow() : NULL;

                    } else {
                        // insert

                        $qt_new = new QuyTrinh();

                        $qt_new->id_thu_tuc = $thu_tuc->id;
                        $qt_new->ten_quy_trinh = $qt['ten_quy_trinh'];
                        $qt_new->ghi_chu = $qt['ghi_chu'];
                        $qt_new->template = $qt['template'];
                        $qt_new->thoi_gian_xu_ly = $qt['thoi_gian_xu_ly'];

                    }

                    if($qt_new->save()) {

                        // check buoc
                        if(count($qt['buoc']) == 0) {
                            throw new \PDOException("Bước không được rỗng");
                        }

                        // insert buoc
                        foreach($qt['buoc'] as $bc) {

                            if(Validator::check('required', $bc['ten_buoc'] ?? NULL)) {
                                throw new \PDOException("Tên bước không được để trống");
                            } else if(Validator::check('required', $bc['ghi_chu'] ?? NULL)) {
                                throw new \PDOException("Ghi chú không được để trống");
                            }

                            if(isset($bc['id'])) {
                                // update

                                if(Validator::check('exists:buoc', $bc['id'] ?? NULL)) {
                                    throw new \PDOException("Bước không tồn tại");
                                }

                                $bc_new = Buoc::find($bc['id']);

                                $bc_new->id_nhom = $bc['id_nhom'];
                                $bc_new->ten_buoc = $bc['ten_buoc'];
                                $bc_new->ghi_chu = $bc['ghi_chu'];
                                $bc_new->deleted_at = isset($bc['deleted_at']) && $bc['deleted_at'] ? Format::timeNow() : NULL;

                            } else {
                                // insert
                                
                                $bc_new = new Buoc();

                                $bc_new->id_quy_trinh = $qt_new->id;
                                $bc_new->id_nhom = $bc['id_nhom'];
                                $bc_new->ten_buoc = $bc['ten_buoc'];
                                $bc_new->ghi_chu = $bc['ghi_chu'];

                            }

                            $bc_new->save();
                        }
                    } else {
                        throw new \PDOException("Không thể lưu quy trình");
                    }
                }

                DB::commit();

                return response()->success(1, 'Sửa thủ tục thành công!', $thu_tuc);
            } catch(\PDOException $e) {
                DB::rollBack();
                Validator::alert($e->getMessage());
            }
        }

        return response()->error(2, 'Sửa thủ tục thất bại!');
    }

    public function change($type) {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id thủ tục',
                'exists:thu_tuc' => 'Không tồn tại thủ tục',
            ],
        ]);

        if($type == 'hide') {
            $model = ThuTuc::find(request()->id)->hide();
        } else {
            $model = ThuTuc::find(request()->id)->show();
        }

        return response()->success(1, 'Thao tác thành công!');
    }

    public function delete() {
        return $this->change('hide');
    }

    public function undelete() {
        return $this->change('show');
    }
}