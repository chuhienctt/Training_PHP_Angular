<?php

namespace App\Middleware;

use Core\Middleware;
use Core\Auth;
use App\Models\Users;

class Authenticate extends Middleware {

    public function check() {
        $token = request()->getBearerToken();

        $user = model('Users')->where(['token' => $token])->first();

        if($user) {
            Auth::set($user);
            return true;
        }

        return false;
    }

    public function redirect() {
        return response()->code(401);
    }
}