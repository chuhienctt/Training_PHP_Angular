<?php

session_start();

// timezone config
date_default_timezone_set($config['timezone']);

// header config
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');

if($_SERVER["REQUEST_METHOD"] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

// if($config['app']['debug']) {
//     error_reporting(E_ALL);
//     ini_set('display_errors', 1);
//     set_error_handler('errorHandler');
// }

define('_ROOT', __DIR__);


// // autoload model
// $files = getFiles(_ROOT.'/../app/Models/', 'php');

// foreach($files as $file) {
//     require_once _ROOT.'/../app/Models/'.$file;
// }

// autoload core
$files = getFiles(_ROOT.'/../core/', 'php');

foreach($files as $file) {
    require_once _ROOT.'/../core/'.$file;
}

// // autoload helpers
// $files = getFiles(_ROOT.'/../app/Helpers/', 'php');

// foreach($files as $file) {
//     require_once _ROOT.'/../app/Helpers/'.$file;
// }


require_once "static.php";

// end

// run the application
$app = new Core\App();

function getFiles($path, $ext) {
    return array_filter(scandir($path), function($file) use($ext) {
        return strpos(strtolower($file), '.'.$ext) > 0;
    });
}

// function errorHandler($errno, $errstr, $errfile, $errline) {
//     header($_SERVER["SERVER_PROTOCOL"]." 417 Expectation Failed");
//     echo json_encode([
//         'status' => 99,
//         'message' => 'Lỗi hệ thống',
//         'data' => [
//             'level' => $errno,
//             'line' => $errline,
//             'error' => $errstr,
//             'file' => $errfile,
//         ]
//     ]);
// }
