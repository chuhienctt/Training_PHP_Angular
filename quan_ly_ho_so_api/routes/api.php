<?php

use Core\Route;

Route::get('/', 'HomeController@index');

Route::group([
    'prefix' => '/api'
], function () {

    Route::post('/auth/login', 'HomeController@login');
    Route::post('/auth/register', 'HomeController@register');

    Route::get('/dia-chinh/get-tinh', 'DiaChinhController@getTinh');
    Route::get('/dia-chinh/get-huyen', 'DiaChinhController@getHuyen');
    Route::get('/dia-chinh/get-xa', 'DiaChinhController@getXa');
    Route::get('/dia-chinh/get-dia-chi', 'DiaChinhController@getDiaChi');

    Route::group([
        'middleware' => 'UserGuard'
    ], function () {

        Route::post('/auth/change-pass', 'HomeController@change_pass');
        Route::put('/auth/update', 'HomeController@update');

    });
    

    Route::post('/admin/auth/login', 'AdminController@login');

    Route::group([
        'prefix' => '/admin',
        'middleware' => 'AdminGuard'
    ], function () {

        Route::group([
            'prefix' => '/linh-vuc'
        ], function () {

            Route::get('/get', 'LinhVucController@get');
            Route::get('/pagination', 'LinhVucController@pagination');
            Route::post('/create', 'LinhVucController@create');
            Route::put('/update', 'LinhVucController@update');
            Route::delete('/delete', 'LinhVucController@delete');

        });

        
        Route::group([
            'prefix' => '/co-quan'
        ], function () {

            Route::get('/get', 'CoQuanController@get');
            Route::get('/pagination', 'CoQuanController@pagination');
            Route::post('/create', 'CoQuanController@create');
            Route::put('/update', 'CoQuanController@update');
            Route::delete('/delete', 'CoQuanController@delete');

        });

        
        Route::group([
            'prefix' => '/user'
        ], function () {

            Route::get('/get', 'UserController@get');
            Route::get('/pagination', 'UserController@pagination');
            Route::post('/create', 'UserController@create');
            Route::put('/update', 'UserController@update');
            Route::delete('/block', 'UserController@block');

        });

    });

});