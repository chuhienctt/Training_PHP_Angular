<?php

namespace Core;

class Format {

    function __construct() {
    }

    public static function toDateTime($value) {
        return date('Y-m-d H:i:s', strtotime($value));
    }

    public static function toTime($value) {
        return date('H:i:s', strtotime($value));
    }

    public static function toDate($value) {
        return date('Y-m-d', strtotime($value));
    }

    public static function timeNow() {
        return date('Y-m-d H:i:s');
    }

}
