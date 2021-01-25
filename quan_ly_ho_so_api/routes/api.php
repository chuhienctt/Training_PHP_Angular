<?php

use Core\Route;

Route::get('/', 'User\HomeController@index');

Route::group([
    'prefix' => '/api'
], function () {

    require_once 'user.php';
    require_once 'admin.php';

});