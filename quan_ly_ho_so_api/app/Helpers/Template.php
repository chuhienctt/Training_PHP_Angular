<?php

namespace App\Helpers;

use Core\Validator;
use Core\File;

class Template {

    protected static $fields_ignore = [
        'province_id',
        'district_id',
    ];
    
    public static function validate($templates, $data) {
        foreach ($templates as $key => $field) {
            if(in_array($field->name, self::$fields_ignore)) {
                continue;
            }

            $value = $data[$field->name] ?? null;

            if($field->required && Validator::check('required', $value)) {
                Validator::alert($field->name." là bắt buộc");
            }

            switch ($field->type) {
                case 'text':
                    if(Validator::check('max:255', $value)) {
                        Validator::alert($field->name." quá 255 kí tự");
                    }
                    break;
                case 'longtext':
                    if(Validator::check('max:3000', $value)) {
                        Validator::alert($field->name." quá 3000 kí tự");
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
                case 'file':

                    $check = false;

                    if(gettype($value) === 'array') {
                        foreach ($value as $file) {
                            if(Validator::check('base64', $file)) {
                                $check = true;
                            }
                        }
                    } else {
                        $check = true;
                    }

                    if($check) {
                        Validator::alert("Tệp đính kèm không đúng định dạng");
                    }

                    break;
                case 'select':
                    if(stripos($field->value, 'model:') !== false) {
                        $model = explode(':', $field->value)[1]::find($value);
                        if(!$model) {
                            Validator::alert($field->title." không tồn tại");
                        }
                    }
                    break;
            }
        }
    }

    public static function get_data($templates, $data) {
        foreach ($templates as $key => $field) {
            if(in_array($field->name, self::$fields_ignore)) {
                continue;
            }

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
                                $file->generateFileName2();
                                $file->save($file->generateDir('/ho-so/'));
                                $files[] = $file->path;
                            }
                        }
                        $value = $files;
                    }
                    break;
            }

            $field->value = $value;
        }

        return $templates;
    }
}