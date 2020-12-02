<?php

namespace Core;

class App {

    function __construct() {
        $route = new Route();
        $route->URLProcess();

        require_once "../routes/api.php";

        $route->RouteProcess();
    }

}