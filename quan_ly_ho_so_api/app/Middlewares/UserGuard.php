<?php

namespace App\Middleware;

use Core\Middleware;
use Core\Auth;
use App\Models\Users;

class UserGuard extends Middleware {

    public function check() {
        $token = request()->getBearerToken();

        $dec_token = Auth::getToken($token);

        if($dec_token) {

            if(time() < $dec_token->exp) {
                $user = model('Users')->where(['token' => $token])->first();
    
                if($user) {
                    Auth::set($user);
                    return true;
                }
            }

        }

        return false;
    }

    public function redirect() {
        return response()->code(401);
    }
}