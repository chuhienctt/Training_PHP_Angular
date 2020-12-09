<?php

use Core\Response;
use Core\Request;
use Core\Validator;
use Core\DB;

$response = new Response();
$request = new Request();
$validator = new Validator();

function response() {
    global $response;
    return $response;
}

function request() {
    global $request;
    return $request;
}

function model($modelName) {
    global $models;
    return $models[$modelName];
}

function validator() {
    global $validator;
    return $validator;
}