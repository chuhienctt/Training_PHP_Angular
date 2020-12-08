<?php

use Core\Route;

Route::get('/', 'HomeController@index');

Route::group([
    'prefix' => '/api'
], function () {

    Route::post('/auth/login', 'AuthenticateController@login');
    Route::post('/auth/register', 'AuthenticateController@register');

    Route::group([
        'middleware' => 'Authenticate'
    ], function () {

        Route::get('/test', 'HomeController@getApiAuth');

    });

});
