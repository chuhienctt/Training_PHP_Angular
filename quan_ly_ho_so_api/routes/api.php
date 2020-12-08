<?php

use Core\Route;

Route::get('/', 'HomeController@index');
Route::get('/test', 'HomeController@test');
Route::post('/test', 'HomeController@test');
Route::put('/test', 'HomeController@test');

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