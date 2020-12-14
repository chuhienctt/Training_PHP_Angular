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
        $value = request()->{$key} ?? null;

        foreach($valis as $v => $alert) {
            if(self::check($v, $value, $key)) {
                self::alert($alert);
            }
        }
    }

    public static function check($validate, $value, $key = '') {
        $m = explode(':', $validate);
        $s = $m[0];
        $g = $m[1] ?? 0;

        switch($s) {
            case 'required':
                if($value === null || $value === '') {
                    return true;
                }
            break;
            case 'max':
                if(strlen($value) > $g) {
                    return true;
                }
            break;
            case 'min':
                if(strlen($value) < $g) {
                    return true;
                }
            break;
            case 'numberic':
                if(is_numeric($value)) {
                    return true;
                }
            break;
            case 'array':
                if(gettype($value) == 'array') {
                    return true;
                }
            break;
            case 'email':
                if(!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $value)) {
                    return true;
                }
            break;
            case 'phone_number':
                if(!preg_match("/^(0)[0-9]{9}$/ix", $value)) {
                    return true;
                }
            break;
            case 'date':
                if(DateTime::createFromFormat(Format::$dateFormat, $value) === false) {
                    return true;
                }
            break;
            case 'time':
                if(DateTime::createFromFormat(Format::$timeFormat, $value) === false) {
                    return true;
                }
            break;
            case 'datetime':
                if(DateTime::createFromFormat(Format::$dateTimeFormat, $value) === false) {
                    return true;
                }
            break;
            case 'password':
                $uppercase = preg_match('@[A-Z]@', $value);
                $lowercase = preg_match('@[a-z]@', $value);
                $number = preg_match('@[0-9]@', $value);
                $specialChars = preg_match('@[^\w]@', $value);

                if(!$uppercase || !$lowercase  || !$number || !$specialChars) {
                    return true;
                }
            break;
            case 'unique':
                $id = request()->id ?? null;
                $data = [$key => $value];

                $id && $data['id'] = ['!=', $id];

                if(DB::table($g)->where($data)->first()) {
                    return true;
                }
            break;
            case 'exists':
                if(!DB::table($g)->where([$key => $value])->first()) {
                    return true;
                }
            break;
            case 'base64':
                if(!preg_match("/^base64:([^;]*);(\d*);(.*)$/", $value)) {
                    return true;
                }
            break;
        }
        return false;
    }

    public static function alert($text) {
        response()->error(0, $text);
    }

}