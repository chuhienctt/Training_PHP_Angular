<?php

namespace Core;

class Middleware {

    function __construct() {
    }

    public function check() {
        return true;
    }

    public function redirect() {
        echo 'redirect';
    }

}