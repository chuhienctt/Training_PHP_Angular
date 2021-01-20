<?php

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$db_config = CONFIG['database'];

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => $db_config['host'],
    'database'  => $db_config['db_name'],
    'username'  => $db_config['username'],
    'password'  => $db_config['password'],
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

// Set the event dispatcher used by Eloquent models... (optional)
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
$capsule->setEventDispatcher(new Dispatcher(new Container));

// Make this Capsule instance available globally via static methods... (optional)
$capsule->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
$capsule->bootEloquent();