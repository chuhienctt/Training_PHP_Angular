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

if($config['app']['debug']) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    set_error_handler('errorHandler');
}

// autoload core
$files = getFiles(__DIR__.'/../core/');

foreach($files as $file) {
    require_once __DIR__.'/../core/'.$file;
}

// autoload models
$files = getFiles(__DIR__.'/../app/Models/');


$models = [];
foreach($files as $file) {
    require_once __DIR__.'/../app/Models/'.$file;

    // init model
    $modelName = explode('.', $file)[0];
    $class = "App\\Models\\".$modelName;

    $models[$modelName] =  new $class();
}


require_once "static.php";

// end

// run the application
$app = new Core\App();

function getFiles($path) {
    return array_filter(scandir($path), function($file) {
        return strpos(strtolower($file), '.php') > 0;
    });
}

function errorHandler($errno, $errstr, $errfile, $errline) {
    response()->code(417, [
        'status' => 99,
        'message' => 'Lỗi hệ thống',
        'data' => [
            'level' => $errno,
            'line' => $errline,
            'error' => $errstr,
            'file' => $errfile,
        ]
    ]);
    exit;
}
