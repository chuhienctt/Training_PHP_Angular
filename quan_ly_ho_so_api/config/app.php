<?php

return [


    // database
    'database' => [
        'host'     => 'localhost',
        'username' => 'root',
        'password' => '',
        'db_name'  => 'test'
    ],


    // timezone
    'timezone' => 'Asia/Ho_Chi_Minh',


    // url
    'url' => [
        'base'   => '/',
        'assets' => 'public/assets'
    ],

    // header
    'header' => [
        'Access-Control-Allow-Origin'  => '*',
        'Content-Type'                 => 'application/json; charset=UTF-8',
        'Access-Control-Allow-Methods' => 'GET,POST,PUT,DELETE',
        'Access-Control-Allow-Headers' => 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    ]
];