<?php

use Core\Route;

Route::get('/', 'HomeController@index');
Route::post('/file', 'HomeController@file');

Route::group([
    'prefix' => '/api'
], function () {

    Route::post('/auth/login', 'HomeController@login');
    Route::post('/auth/register', 'HomeController@register');

    Route::group([
        'middleware' => 'Authenticate'
    ], function () {

        // Route::get('/test', 'HomeController@getApiAuth');

    });
    

    Route::group([
        'prefix' => '/admin'
    ], function () {

        Route::post('/auth/login', 'AdminController@login');

    });

});