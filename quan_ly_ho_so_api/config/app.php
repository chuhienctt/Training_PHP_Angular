<?php

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '/../.env');
$dotenv->load();

return [

    'app' => [
        'debug' => $_ENV['DEBUG'],
    ],

    // database
    'database' => [
        'host'     => $_ENV['HOST'],
        'username' => $_ENV['USERNAME'],
        'password' => $_ENV['PASSWORD'],
        'db_name'  => $_ENV['DB_NAME']
    ],


    // timezone
    'timezone' => $_ENV['TIMEZONE'],


    // file system
    'storage' => 'public/storage',
];
