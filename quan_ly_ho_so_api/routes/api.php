<?php

use Core\Route;

Route::get('/', 'User\HomeController@index');

Route::group([
    'prefix' => '/api'
], function () {

    Route::post('/auth/login', 'User\HomeController@login');
    Route::post('/auth/register', 'User\HomeController@register');

    Route::get('/dia-chinh/get-tinh', 'User\DiaChinhController@getTinh');
    Route::get('/dia-chinh/get-huyen', 'User\DiaChinhController@getHuyen');
    Route::get('/dia-chinh/get-xa', 'User\DiaChinhController@getXa');
    Route::get('/dia-chinh/get-dia-chi', 'User\DiaChinhController@getDiaChi');

    Route::group([
        'middleware' => 'UserGuard'
    ], function () {

        Route::post('/auth/change-pass', 'User\HomeController@change_pass');
        Route::put('/auth/update', 'User\HomeController@update');

    });

    Route::group([
        'prefix' => '/linh-vuc'
    ], function () {

        Route::get('/get', 'User\LinhVucController@get');

    });
    

    Route::post('/admin/auth/login', 'Admin\AdminController@login');

    Route::group([
        'prefix' => '/admin',
        'middleware' => 'AdminGuard'
    ], function () {
        
        Route::post('/auth/change-pass', 'Admin\AdminController@change_pass');
        Route::put('/auth/update', 'Admin\AdminController@update');

        Route::group([
            'prefix' => '/linh-vuc'
        ], function () {

            Route::get('/get', 'Admin\LinhVucController@get');
            Route::get('/pagination', 'Admin\LinhVucController@pagination');
            Route::post('/create', 'Admin\LinhVucController@create');
            Route::put('/update', 'Admin\LinhVucController@update');
            Route::delete('/delete', 'Admin\LinhVucController@delete');
            Route::delete('/undelete', 'Admin\LinhVucController@undelete');

        });

        
        Route::group([
            'prefix' => '/co-quan'
        ], function () {

            Route::get('/get', 'Admin\CoQuanController@get');
            Route::get('/pagination', 'Admin\CoQuanController@pagination');
            Route::post('/create', 'Admin\CoQuanController@create');
            Route::put('/update', 'Admin\CoQuanController@update');
            Route::delete('/delete', 'Admin\CoQuanController@delete');
            Route::delete('/undelete', 'Admin\CoQuanController@undelete');

        });

        
        Route::group([
            'prefix' => '/thu-tuc'
        ], function () {

            Route::get('/get', 'Admin\ThuTucController@get');
            Route::get('/pagination', 'Admin\ThuTucController@pagination');
            Route::get('/templates', 'Admin\ThuTucController@get_templates');
            Route::post('/create', 'Admin\ThuTucController@create');
            Route::put('/update', 'Admin\ThuTucController@update');
            Route::delete('/delete', 'Admin\ThuTucController@delete');
            Route::delete('/undelete', 'Admin\ThuTucController@undelete');

        });

        
        Route::group([
            'prefix' => '/quy-trinh'
        ], function () {

            Route::delete('/delete', 'Admin\QuyTrinhController@delete');
            Route::delete('/undelete', 'Admin\QuyTrinhController@undelete');

        });

        
        Route::group([
            'prefix' => '/buoc'
        ], function () {

            Route::delete('/delete', 'Admin\BuocController@delete');
            Route::delete('/undelete', 'Admin\BuocController@undelete');

        });

        
        Route::group([
            'prefix' => '/user'
        ], function () {

            Route::get('/get', 'Admin\UserController@get');
            Route::get('/pagination', 'Admin\UserController@pagination');
            Route::post('/create', 'Admin\UserController@create');
            Route::put('/update', 'Admin\UserController@update');
            Route::post('/block', 'Admin\UserController@block');
            Route::post('/unblock', 'Admin\UserController@unblock');

        });

        Route::group([
            'prefix' => '/nhom'
        ], function () {

            Route::get('/get', 'Admin\NhomUsersController@get');
            Route::get('/pagination', 'Admin\NhomUsersController@pagination');
            Route::post('/create', 'Admin\NhomUsersController@create');
            Route::put('/update', 'Admin\NhomUsersController@update');
            Route::delete('/delete', 'Admin\NhomUsersController@delete');
            Route::delete('/undelete', 'Admin\NhomUsersController@undelete');

        });

        Route::group([
            'prefix' => '/ho-so'
        ], function () {

            Route::get('/get', 'Admin\HoSoController@get');
            Route::get('/pagination', 'Admin\HoSoController@pagination');
            Route::get('/get-template', 'Admin\HoSoController@get_template');

        });

        
        Route::group([
            'prefix' => '/dia-chinh'
        ], function () {

            Route::get('/get-tinh', 'Admin\DiaChinhController@get_tinh');
            Route::get('/pagination-tinh', 'Admin\DiaChinhController@pagination_tinh');
            Route::post('/create-tinh', 'Admin\DiaChinhController@create_tinh');
            Route::put('/update-tinh', 'Admin\DiaChinhController@update_tinh');
            Route::delete('/delete-tinh', 'Admin\DiaChinhController@delete_tinh');
            Route::delete('/undelete-tinh', 'Admin\DiaChinhController@undelete_tinh');
            
            Route::get('/get-huyen', 'Admin\DiaChinhController@get_huyen');
            Route::get('/pagination-huyen', 'Admin\DiaChinhController@pagination_huyen');
            Route::post('/create-huyen', 'Admin\DiaChinhController@create_huyen');
            Route::put('/update-huyen', 'Admin\DiaChinhController@update_huyen');
            Route::delete('/delete-huyen', 'Admin\DiaChinhController@delete_huyen');
            Route::delete('/undelete-huyen', 'Admin\DiaChinhController@undelete_huyen');
            
            Route::get('/get-xa', 'Admin\DiaChinhController@get_xa');
            Route::get('/pagination-xa', 'Admin\DiaChinhController@pagination_xa');
            Route::post('/create-xa', 'Admin\DiaChinhController@create_xa');
            Route::put('/update-xa', 'Admin\DiaChinhController@update_xa');
            Route::delete('/delete-xa', 'Admin\DiaChinhController@delete_xa');
            Route::delete('/undelete-xa', 'Admin\DiaChinhController@undelete_xa');

        });

    });

});