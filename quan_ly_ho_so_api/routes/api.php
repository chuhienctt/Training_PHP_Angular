<?php

use Core\Route;

Route::get('/', 'HomeController@index');

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

        Route::group([
            'prefix' => '/linh-vuc'
        ], function () {

            Route::get('/get', 'LinhVucController@get');
            Route::get('/pagination', 'LinhVucController@pagination');
            Route::post('/create', 'LinhVucController@create');
            Route::put('/update', 'LinhVucController@update');
            Route::delete('/delete', 'LinhVucController@delete');

        });

    });

});