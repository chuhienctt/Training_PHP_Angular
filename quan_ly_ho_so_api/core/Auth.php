<?php

namespace Core;

use Firebase\JWT\JWT;

class Auth {
    private static $user = null;

    function __construct() {
    }

    public static function set($user) {
        self::$user = $user;
    }

    public static function get() {
        return self::$user;
    }

    public static function createToken($id = '') {
        $iat = time();
        $exp = $iat + CONFIG['jwt']['time_life'];

        $token = [
            'iat' => $iat,
            'exp' => $exp,
            'data' => $id,
        ];

        return JWT::encode($token, CONFIG['jwt']['secret']);
    }

    public static function getToken($token) {
        try {
            $decoded = JWT::decode($token, CONFIG['jwt']['secret'], ['HS256']);
            return isset($decoded->data) ? $decoded : false;
         } catch (\Exception $e) {
             return false;
         }
         
    }

    public static function createPassword($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public static function checkPassword($password, $hash) {
        return password_verify($password, $hash);
    }

}