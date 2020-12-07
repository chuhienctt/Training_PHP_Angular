<?php

namespace App\Controller;

use Core\Controller;
use Core\Auth;

class HomeController extends Controller {

    public function index() {
        return response()->json([
            'welcome' => 'Welcome to NDT API Framework'
        ]);
    }

    public function test() {
        $data = request()->data;
        return response()->json([
            'data' => $data
        ]);
    }

    public function getApiNoAuth() {
        return response()->json([
            'message' => 'Use middleware'
        ]);
    }

    public function getApiAuth() {
        return response()->json(Auth::get());
    }
}
