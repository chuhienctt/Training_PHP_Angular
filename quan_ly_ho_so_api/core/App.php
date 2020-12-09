<?php

namespace Core;

class App {

    function __construct() {
        $route = new Route();
        $route->URLProcess();

        require_once __DIR__.'/../routes/api.php';

        $result = $route->RouteProcess();
        if(!$result) {
            return response()->code(404);
        }
    }

}