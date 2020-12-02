<?php

namespace App\Middleware;

use Core\Middleware;

class Authenticate extends Middleware {

    public function check() {
        return true;
    }

    public function redirect() {
        return response()->code(204);
    }

}