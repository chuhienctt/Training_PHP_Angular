<?php

session_start();

// timezone config
date_default_timezone_set($config['timezone']);

// header config
foreach($config['header'] as $key => $value) {
    header("{$key}: {$value}");
}

// autoload core
$files = getFiles(__DIR__.'/../core/');

foreach($files as $file) {
    require_once __DIR__.'/../core/'.$file;
}

// autoload models
$files = getFiles(__DIR__.'/../app/Models/');


require_once "static.php";


$models = [];
foreach($files as $file) {
    require_once __DIR__.'/../app/Models/'.$file;

    // init model
    $modelName = explode('.', $file)[0];
    $class = "App\\Model\\".$modelName;

    $models[$modelName] =  new $class();
}

// end

// run the application
$app = new Core\App();

function getFiles($path) {
    return array_filter(scandir($path), function($file) {
        return strpos(strtolower($file), '.php') > 0;
    });
}