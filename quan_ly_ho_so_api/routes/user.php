<?php

use Core\Route;

Route::post('/auth/login', 'User\HomeController@login');
Route::post('/auth/register', 'User\HomeController@register');

Route::group([
    'prefix' => '/dia-chinh'
], function () {

    Route::get('/get-tinh', 'User\DiaChinhController@getTinh');
    Route::get('/get-huyen', 'User\DiaChinhController@getHuyen');
    Route::get('/get-xa', 'User\DiaChinhController@getXa');
    Route::get('/get-dia-chi', 'User\DiaChinhController@getDiaChi');

});

Route::group([
    'middleware' => 'UserGuard'
], function () {

    Route::get('/auth/check', 'User\HomeController@check');
    Route::post('/auth/change-pass', 'User\HomeController@change_pass');
    Route::put('/auth/update', 'User\HomeController@update');

});

Route::group([
    'prefix' => '/linh-vuc'
], function () {

    Route::get('/get', 'User\LinhVucController@get');

});


Route::group([
    'prefix' => '/co-quan'
], function () {

    Route::get('/get', 'User\CoQuanController@get');

});

Route::group([
    'prefix' => '/thu-tuc'
], function () {

    Route::get('/get', 'User\ThuTucController@get');
    Route::get('/get-quy-trinh', 'User\ThuTucController@get_list_quy_trinh');
    Route::get('/pagination', 'User\ThuTucController@pagination');

});


Route::group([
    'prefix' => '/ho-so'
], function () {

    Route::get('/get-template', 'User\HoSoController@get_template');

    Route::group([
        'middleware' => 'UserGuard'
    ], function () {
    
        Route::get('/get-ho-so', 'User\HoSoController@get_ho_so');
    
    });

    Route::post('/create', 'User\HoSoController@create');

});