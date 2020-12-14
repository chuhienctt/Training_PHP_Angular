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
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway TimeOut',
        505 => 'HTTP Version Not Supported'
    ];

    protected $variables = [
        'tmp_data',
        'original_data',
        'mat_khau'
    ];

    public function code($code, $data = []) {
        header($_SERVER["SERVER_PROTOCOL"]." $code ".$this->httpStatus[$code]);
        echo json_encode($this->hiddenVariable($data));
        exit;
    }

    public function json($data) {
        $this->code(200, $data);
    }

    public function success($status, $message, $data = []) {
        $this->code(200, [
            'status' => $status,
            'message' => $message,
            'data' => $this->hiddenVariable($data),
        ]);
    }

    public function error($status, $message) {
        $this->code(400, [
            'status' => $status,
            'message' => $message,
            'data' => []
        ]);
    }

    public function hiddenVariable($data) {
        if(gettype($data) === 'object') {
            $data = $this->hiddenVariableObject($data);
        } else if(gettype($data) === 'array') {
            foreach($data as $object) {
                if(gettype($object) == 'array') {
                    $object = $this->hiddenVariable($object);
                } else {
                    $object = $this->hiddenVariableObject($object);
                }
            }
        }

        return $data;
        
    }

    public function hiddenVariableObject($object) {
        foreach($this->variables as $var) {
            if(isset($object->{$var})) {
                unset($object->{$var});
            }
        }
        return $object;
    }

}