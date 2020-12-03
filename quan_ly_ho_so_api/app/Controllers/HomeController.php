<?php

namespace App\Controller;

use Core\Controller;
use Core\DB;
use App\Model\Users;

class HomeController extends Controller {

    public function index() {
        return response()->code(200);
    }

    public function getApiNoAuth() {
        echo "Không có middleware";
    }

    public function getApiAuth() {
        echo "Có middleware";
    }
}