<?php

namespace Core;

class File {
    private $type = 'file';
    public $file_name = null;
    public $file_type = null;
    public $file_tmp = null;
    public $file_size = null;
    public $file_data = null;
    private static $ext_image = ['png', 'jpg', 'jpeg'];

    function __construct() {
    }

    public static function create($name, $type, $tmp_name, $size) {
        $file = new File();

        $file->type = 'file';

        $file->file_name = $name;
        $file->file_type = $type;
        $file->file_tmp = $tmp_name;
        $file->file_size = $size;

        return $file;
    }

    public static function createBase64($data) {
        $data = explode(';', explode(':', $data)[1]);

        $file = new File();

        $file->type = 'base64';

        $file->file_name = $data[0];
        $file->file_size = $data[1];
        $file->file_data = $data[2];

        return $file;
    }

    public function getFileExtension() {
        return pathinfo($this->file_name, PATHINFO_EXTENSION);
    }

    public function getFileName() {
        return $this->file_name;
    }

    public function getFileSize() {
        return $this->file_size;
    }

    public function isImage() {
        return in_array($this->getFileExtension(), self::$ext_image);
    }

    public function generateFileName() {
        $this->file_name = sha1(mt_rand(1, 90000).time().$this->file_name).'.'.$this->getFileExtension();
    }

    public function save($dir = '/') {
        $path = __DIR__."/../".CONFIG['storage'].$dir;

        try {
            if(!is_dir($path)) {
                mkdir($path);
            }

            if($this->type == 'file') {
                // file save

                move_uploaded_file($this->file_tmp, $path.$this->file_name);
            } else if($this->type == 'base64') {
                // base64 save

                $file = fopen($path.$this->file_name, "wb");
                fwrite($file, base64_decode($this->file_data));
                fclose($file);
            }
            return true;
        } catch(Exception $e) {}
        return false;
    }

}