<?php

namespace App\Helpers;

use Core\Validator;
use Core\File;

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
        $r_data = [];
        foreach ($templates as $key => $field) {
            $value = $data[$field->name] ?? NULL;

            switch ($field->type) {
                case 'date':
                    $value = Format::toDate($value);
                    break;
                case 'file':
                    if(gettype($value) === 'array') {
                        $files = [];
                        foreach ($value as $file) {
                            if(!Validator::check('base64', $file)) {
                                $file = File::createBase64($file);
                                $file->generateFileName();
                                $file->save('/ho-so-images/');
                                $files[] = '/ho-so-images/'.$file->getFileName();
                            }
                        }
                        $value = $files;
                    }
                    break;
            }

            $r_data[$field->name] = $value;
        }

        return $r_data;
    }
}