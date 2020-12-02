<?php

use Core\Route;

Route::get('/', 'HomeController@index');

Route::group([
    'prefix' => '/api'
], function () {

    Route::get('/no-auth', 'HomeController@getApiNoAuth');

    Route::group([
        'middleware' => 'Authenticate'
    ], function () {
    
        Route::get('/auth', 'HomeController@getApiAuth');

    });
    
    Route::get('/no-auth2', 'HomeController@getApiNoAuth');

});