<?php

namespace Core;

class Auth {
    private static $user = null;
    private static $cost = 10;

    function __construct() {
    }

    public static function set($user) {
        self::$user = $user;
    }

    public static function get() {
        return self::$user;
    }

    public static function createToken($salt = '') {
        return sha1(mt_rand(1, 90000).time().$salt);
    }

    public static function createPassword($password) {
        return password_hash($password, PASSWORD_BCRYPT, ["cost" => self::$cost]);
    }

    public static function checkPassword($password, $hash) {
        return password_verify($password, $hash);
    }

}