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

class QuyTrinhController extends Controller {

    public function change($type) {
        
        validator()->validate([
            'id' => [
                'required' => 'Thiếu id quy trình',
                'exists:quy_trinh' => 'Không tồn tại quy trình',
            ],
        ]);

        if($type == 'hide') {
            $model = model('QuyTrinh')->find(request()->id)->hide();
        } else {
            $model = model('QuyTrinh')->find(request()->id)->show();
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