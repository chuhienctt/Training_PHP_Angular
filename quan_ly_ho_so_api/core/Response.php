<?php

namespace Core;

class Response {
    protected $httpStatus = [
        100 => 'Continue',
        101 => 'Switching Protocols',
        200 => 'OK',
        201 => 'Created',
        202 => 'Acceped',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found',
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        306 => '(Unused)',
        307 => 'Temporary Redirect',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Require',
        408 => 'Request Timeout',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Require',
        412 => 'Precondition Failed',
        413 => 'Request Entity Too Large',
        414 => 'Request-URI Too Long',
        415 => 'Unsupported Media Type',
        416 => 'Requested Range Not Satisfiable',
        417 => 'Expectation Failed',
        422 => 'Unprocessable Entity',
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway TimeOut',
        505 => 'HTTP Version Not Supported'
    ];

    public function code($code, $data = []) {
        header($_SERVER["SERVER_PROTOCOL"]." $code ".$this->httpStatus[$code]);
        echo json_encode($data);
        exit;
    }

    public function json($data) {
        $this->code(200, $data);
    }

    public function success($status, $message, $data = []) {
        $this->code(200, [
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ]);
    }

    public function error($status, $message, $code = 400) {
        $this->code($code, [
            'status' => $status,
            'message' => $message,
            'data' => []
        ]);
    }

    // public function hiddenVariable($data) {
    //     if($data instanceof Model) {
    //         // la model
            
    //         foreach ($data->getHidden() as $hide) {
    //             unset($data->{$hide});
    //         }
    //     } else if(gettype($data) == 'object') {
    //         // la object thuong
    //         $vars = get_class_vars(get_class($data));

    //         foreach ($vars as $key => $value) {
    //             $this->hiddenVariable($value);
    //         }
    //     } else if(gettype($data) == 'array') {
    //         foreach ($data as $key => $value) {
    //             $this->hiddenVariable($value);
    //         }
    //     }

    //     return $data;
    // }

}