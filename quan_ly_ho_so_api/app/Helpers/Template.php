<?php

namespace App\Helpers;

use Core\Validator;

class Template {
    
    public static function validate($templates, $data) {
        foreach ($templates as $key => $field) {
            $value = $data[$field->name] ?? null;

            switch ($field->type) {
                case 'text':
                    if(Validator::check('required', $value)) {
                        Validator::alert($field->name." là bắt buộc");
                    }
                    if(Validator::check('max:255', $value)) {
                        Validator::alert($field->name." quá 255 kí tự");
                    }
                    break;
                case 'date':
                    if(Validator::check('date', $value)) {
                        Validator::alert($field->name." không đúng định dạng");
                    }
                    break;
                case 'email':
                    if(Validator::check('email', $value)) {
                        Validator::alert($field->name." không đúng định dạng");
                    }
                    break;
                case 'phone_number':
                    if(Validator::check('phone_number', $value)) {
                        Validator::alert($field->name." không đúng định dạng");
                    }
                    break;
                // case 'file':

                //     $check = false;

                //     if(gettype($value) === 'array') {
                //         foreach ($value as $file) {
                //             if(!self::check('base64', $file)) {
                //                 $check = true;
                //             }
                //         }
                //     } else {
                //         $check = true;
                //     }

                //     if($check) {
                //         self::alert("Tệp đính kèm không đúng định dạng");
                //     }

                //     break;
            }
        }
    }

    public static function get_data($templates, $data) {
        foreach ($templates as $key => $field) {
            $value = $data[$field->name];

            switch ($field->type) {
                case 'date':
                    $data[$field->name] = Format::toDate($data[$field->name]);
                    break;
                case 'email':
                    if(Validator::check('email', $value)) {
                        Validator::alert($field->name." không đúng định dạng");
                    }
                    break;
                case 'phone_number':
                    if(Validator::check('phone_number', $value)) {
                        Validator::alert($field->name." không đúng định dạng");
                    }
                    break;
                // case 'file':

                //     $check = false;

                //     if(gettype($value) === 'array') {
                //         foreach ($value as $file) {
                //             if(!self::check('base64', $file)) {
                //                 $check = true;
                //             }
                //         }
                //     } else {
                //         $check = true;
                //     }

                //     if($check) {
                //         self::alert("Tệp đính kèm không đúng định dạng");
                //     }

                //     break;
            }
        }
    }
}