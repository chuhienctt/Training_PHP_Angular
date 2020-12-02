<?php

/**
 * NDT - A PHP Framework
 *
 * @package  NDT
 * @author   NDTpro <admin@ndtoan.com>
 */

// get config app
$config = require_once __DIR__.'/../config/app.php';

define("CONFIG", $config);

// autoload composer library
if(file_exists(__DIR__.'/../vendor/autoload.php')) {
    require_once __DIR__.'/../vendor/autoload.php';
}

require_once __DIR__.'/../bootstrap/app.php';