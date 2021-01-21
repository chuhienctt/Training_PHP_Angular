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
        
        Route::post('/auth/change-pass', 'AdminController@change_pass');
        Route::put('/auth/update', 'AdminController@update');

        Route::group([
            'prefix' => '/linh-vuc'
        ], function () {

            Route::get('/get', 'LinhVucController@get');
            Route::get('/pagination', 'LinhVucController@pagination');
            Route::post('/create', 'LinhVucController@create');
            Route::put('/update', 'LinhVucController@update');
            Route::delete('/delete', 'LinhVucController@delete');
            Route::delete('/undelete', 'LinhVucController@undelete');

        });

        
        Route::group([
            'prefix' => '/co-quan'
        ], function () {

            Route::get('/get', 'CoQuanController@get');
            Route::get('/pagination', 'CoQuanController@pagination');
            Route::post('/create', 'CoQuanController@create');
            Route::put('/update', 'CoQuanController@update');
            Route::delete('/delete', 'CoQuanController@delete');
            Route::delete('/undelete', 'CoQuanController@undelete');

        });

        
        Route::group([
            'prefix' => '/thu-tuc'
        ], function () {

            Route::get('/get', 'ThuTucController@get');
            Route::get('/pagination', 'ThuTucController@pagination');
            Route::get('/templates', 'ThuTucController@get_templates');
            Route::post('/create', 'ThuTucController@create');
            Route::put('/update', 'ThuTucController@update');
            Route::delete('/delete', 'ThuTucController@delete');
            Route::delete('/undelete', 'ThuTucController@undelete');

        });

        
        Route::group([
            'prefix' => '/quy-trinh'
        ], function () {

            Route::delete('/delete', 'QuyTrinhController@delete');
            Route::delete('/undelete', 'QuyTrinhController@undelete');

        });

        
        Route::group([
            'prefix' => '/buoc'
        ], function () {

            Route::delete('/delete', 'BuocController@delete');
            Route::delete('/undelete', 'BuocController@undelete');

        });


        Route::group([
            'prefix' => '/user'
        ], function () {

            Route::get('/get', 'UserController@get');
            Route::get('/pagination', 'UserController@pagination');
            Route::post('/create', 'UserController@create');
            Route::put('/update', 'UserController@update');
            Route::post('/block', 'UserController@block');
            Route::post('/unblock', 'UserController@unblock');

        });

        Route::group([
            'prefix' => '/nhom'
        ], function () {

            Route::get('/get', 'NhomUsersController@get');
            Route::get('/pagination', 'NhomUsersController@pagination');
            Route::post('/create', 'NhomUsersController@create');
            Route::put('/update', 'NhomUsersController@update');
            Route::delete('/delete', 'NhomUsersController@delete');
            Route::delete('/undelete', 'NhomUsersController@undelete');

        });

        
        Route::group([
            'prefix' => '/dia-chinh'
        ], function () {

            Route::get('/get-tinh', 'DiaChinhController@get_tinh');
            Route::get('/pagination-tinh', 'DiaChinhController@pagination_tinh');
            Route::post('/create-tinh', 'DiaChinhController@create_tinh');
            Route::put('/update-tinh', 'DiaChinhController@update_tinh');
            Route::delete('/delete-tinh', 'DiaChinhController@delete_tinh');
            Route::delete('/undelete-tinh', 'DiaChinhController@undelete_tinh');
            
            Route::get('/get-huyen', 'DiaChinhController@get_huyen');
            Route::get('/pagination-huyen', 'DiaChinhController@pagination_huyen');
            Route::post('/create-huyen', 'DiaChinhController@create_huyen');
            Route::put('/update-huyen', 'DiaChinhController@update_huyen');
            Route::delete('/delete-huyen', 'DiaChinhController@delete_huyen');
            Route::delete('/undelete-huyen', 'DiaChinhController@undelete_huyen');
            
            Route::get('/get-xa', 'DiaChinhController@get_xa');
            Route::get('/pagination-xa', 'DiaChinhController@pagination_xa');
            Route::post('/create-xa', 'DiaChinhController@create_xa');
            Route::put('/update-xa', 'DiaChinhController@update_xa');
            Route::delete('/delete-xa', 'DiaChinhController@delete_xa');
            Route::delete('/undelete-xa', 'DiaChinhController@undelete_xa');

        });

    });

});