<?php

namespace Core;

use DateTime;

class Validator {

    function __construct() {
    }

    public function validate($validate) {
        foreach($validate as $key => $valis) {
            $this->vali($key, $valis);
        }
    }

    private function vali($key, $valis) {
        if(!isset(request()->{$key})) {
            // variable not exists
            response()->error(2, "Không tồn tại trường dữ liệu $key.");
            exit;
        }

        $value = request()->{$key};

        foreach($valis as $v => $alert) {
            $m = explode(':', $v);
            $s = $m[0];
            $g = $m[1] ?? 0;

            $check = false;
            switch($s) {
                case 'required':
                    if($value === null || $value === '') {
                        $check = true;
                    }
                break;
                case 'max':
                    if(strlen($value) > $g) {
                        $check = true;
                    }
                break;
                case 'min':
                    if(strlen($value) < $g) {
                        $check = true;
                    }
                break;
                case 'email':
                    if(!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $value)) {
                        $check = true;
                    }
                break;
                case 'phone_number':
                    if(!preg_match("/^(0)[0-9]{9}$/ix", $value)) {
                        $check = true;
                    }
                break;
                case 'date':
                    if(DateTime::createFromFormat(Format::$dateFormat, $value) === false) {
                        $check = true;
                    }
                break;
                case 'time':
                    if(DateTime::createFromFormat(Format::$timeFormat, $value) === false) {
                        $check = true;
                    }
                break;
                case 'datetime':
                    if(DateTime::createFromFormat(Format::$dateTimeFormat, $value) === false) {
                        $check = true;
                    }
                break;
                case 'password':
                    $uppercase = preg_match('@[A-Z]@', $value);
                    $lowercase = preg_match('@[a-z]@', $value);
                    $number = preg_match('@[0-9]@', $value);
                    $specialChars = preg_match('@[^\w]@', $value);

                    if(!$uppercase || !$lowercase  || !$number || !$specialChars) {
                        $check = true;
                    }
                break;
                case 'unique':
                    if(DB::table($g)->where([$key => $value])->first()) {
                        $check = true;
                    }
                break;
            }
            if($check) {
                $this->alert($alert);
            }
        }
    }

    private function alert($text) {
        response()->error(0, $text);
        exit;
    }

}