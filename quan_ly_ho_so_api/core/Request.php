<?php

namespace Core;

class Request {

    function __construct() {
        $post = json_decode(file_get_contents('php://input'), true);

        $this->data = array_merge($post ?? [], $_GET ?? [], $_FILES ?? []);

        foreach($this->data as $key => $value) {
            $this->{$key} = $value;
        }
    }

    public function all() {
        return $this->data;
    }

    public function has($variable) {
        return isset($this->data[$variable]);
    }

    public function get($variable) {
        return $this->data[$variable] ?? null;
    }

    public function getAuthorizationHeader() {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        }
        else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            //print_r($requestHeaders);
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }

    public function getBearerToken() {
        $headers = $this->getAuthorizationHeader();
        // HEADER: Get the access token from the header
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    public function validate($validate) {
        
    }

}