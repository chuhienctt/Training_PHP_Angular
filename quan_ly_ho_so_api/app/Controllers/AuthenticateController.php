<?php

namespace App\Controller;

use Core\Controller;

class AuthenticateController extends Controller {

    public function login() {
        return response()->json([
            'welcome' => 'Welcome to NDT API Framework'
        ]);
    }

}