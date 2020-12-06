<?php

namespace App\Controller;

use Core\Controller;

class HomeController extends Controller {

    public function index() {
        return response()->json([
            'welcome' => 'Welcome to NDT API Framework'
        ]);
    }

    public function getApiNoAuth() {
        echo "Use middleware";
    }

    public function getApiAuth() {
        echo "Do not use middleware";
    }
}