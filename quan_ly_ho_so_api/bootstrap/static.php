<?php

use Core\Response;
use Core\Request;
use Core\DB;

$response = new Response();
$request = new Request();

function response() {
    global $response;
    return $response;
}

function request() {
    global $request;
    return $request;
}