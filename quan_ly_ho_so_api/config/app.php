<?php

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '/../.env');
$dotenv->load();

return [


    // database
    'database' => [
        'host'     => $_ENV['HOST'],
        'username' => $_ENV['USERNAME'],
        'password' => $_ENV['PASSWORD'],
        'db_name'  => $_ENV['DB_NAME']
    ],


    // timezone
    'timezone' => $_ENV['TIMEZONE'],


    // url
    'url' => [
        'base'   => '/',
        'assets' => 'public/assets'
    ],

    // header
    'header' => [
        'Access-Control-Allow-Origin'  => '*',
        'Content-Type'                 => 'application/json',
        "Accept"                       => 'application/json',
        'Access-Control-Allow-Methods' => 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type',
    ]
];
