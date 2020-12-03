<?php

namespace Core;

use Exception;

class Route {
    protected static $routes = [];
    protected static $group_config = [];
    protected $route = "/";
    protected $request_method = "GET";

    public function URLProcess() {
        $url = urldecode($_SERVER['REQUEST_URI']);

        $path = parse_url($url, PHP_URL_PATH);
        // $query = parse_url($url, PHP_URL_QUERY);

        // $urls = explode('/', rtrim($path, '/'));


        if(strpos($path, 'public') > 0) {
            $this->route = substr($path, strripos($path, 'public') + 6);
        } else {
            $this->route = $path;
        }
        
        $this->request_method = $_SERVER["REQUEST_METHOD"];
    }

    public function RouteProcess() {

        $curr_route = self::$routes[$this->route][$this->request_method] ?? false;

        if($curr_route) {
            $middleware = $curr_route['middleware'];
            $middlewareCheck = true;
            
            if($middleware) {
                $middlewareCheck = $middleware->check();

                if(!$middlewareCheck) {
                    $middleware->redirect();
                    return;
                }
            }

            if($middlewareCheck) {
                $curr_route['controller']->{$curr_route['action']}();
            }

        } else {
            // redirect to 404 page
            echo '404';
        }

    }

    private static function request($func) {
        $funcs = explode('@', $func);

        $controllerName = $funcs[0];
        $methodName = $funcs[1];

        $file = __DIR__."/../app/Controllers/{$controllerName}.php";
        if(!file_exists($file)) {
            throw new Exception("{$controllerName} not found");
        }

        require_once $file;
        $c = "App\\Controller\\".$controllerName;
        $controller = new $c;

        if(!method_exists($controller, $methodName)) {
            throw new Exception("{$methodName} in {$controllerName} not exists");
        }

        return [
            'middleware' => self::get_config('middleware'),
            'controller' => $controller,
            'action'     => $methodName,
        ];
    }

    public static function get($route, $func) {
        try {
            $route = (self::get_config('prefix') ?? '').$route;

            self::$routes[$route]['GET'] = self::request($func);
        } catch(Exception $e) {
            echo "Caught exception: ".$e->getMessage()."\n";
        }
    }

    public static function post($route, $func) {
        try {
            $route = (self::get_config('prefix') ?? '').$route;
            
            self::$routes[$route]['POST'] = self::request($func);
        } catch(Exception $e) {
            echo "Caught exception: ".$e->getMessage()."\n";
        }
    }

    public static function put($route, $func) {
        try {
            $route = (self::get_config('prefix') ?? '').$route;
            
            self::$routes[$route]['PUT'] = self::request($func);
        } catch(Exception $e) {
            echo "Caught exception: ".$e->getMessage()."\n";
        }
    }

    public static function delete($route, $func) {
        try {
            $route = (self::get_config('prefix') ?? '').$route;
            
            self::$routes[$route]['DELETE'] = self::request($func);
        } catch(Exception $e) {
            echo "Caught exception: ".$e->getMessage()."\n";
        }
    }

    public static function group($config, $callback) {
        if(isset($config['middleware'])) {
            $middlewareName = $config['middleware'];
            $file = __DIR__."/../app/Middlewares/{$middlewareName}.php";

            if(!file_exists($file)) {
                echo "Caught exception: {$middlewareName} not found\n";
                return;
            }

            require_once $file;
            $m = "App\\Middleware\\".$middlewareName;
            $config['middleware'] = new $m;
        }

        $tmp_config = self::$group_config;
        self::$group_config = array_merge(self::$group_config, $config);
        $callback();
        self::$group_config = $tmp_config;
    }

    public static function get_config($key) {
        return self::$group_config[$key] ?? null;
    }
}