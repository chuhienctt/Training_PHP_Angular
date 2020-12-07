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
        return response()->json([
            'message' => 'Use middleware'
        ]);
    }

    public function getApiAuth() {
        return response()->json([
            'welcome' => 'Do not use middleware'
        ]);
    }
}
