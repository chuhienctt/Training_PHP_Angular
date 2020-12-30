<?php

namespace Core;

class Format {
    public static $dateFormat = "Y-m-d";
    public static $timeFormat = "H:i:s";
    public static $dateTimeFormat = "Y-m-d H:i:s";

    function __construct() {
    }

    public static function toDateTime($value) {
        return date(self::$dateTimeFormat, strtotime($value));
    }

    public static function toTime($value) {
        return date(self::$timeFormat, strtotime($value));
    }

    public static function toDate($value) {
        return date(self::$dateFormat, strtotime($value));
    }

    public static function timeNow() {
        return date(self::$dateTimeFormat);
    }

    public static function compareTime($start_time, $end_time) {
        $start_time = strtotime($start_time);
        $end_time = strtotime($end_time);

        return $end_time > $start_time ? 1 : $end_time == $start_time ? 0 : -1;
    }

}