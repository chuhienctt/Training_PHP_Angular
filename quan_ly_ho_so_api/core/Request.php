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

}