<?php

namespace App\Controller;

use Core\Controller;
use Core\DB;
use App\Model\Users;

class HomeController extends Controller {

    public function index() {
        return response()->json(PHP_OS);
    }

    public function getApiNoAuth() {
        echo "Use middleware";
    }

    public function getApiAuth() {
        echo "Do not use middleware";
    }
}