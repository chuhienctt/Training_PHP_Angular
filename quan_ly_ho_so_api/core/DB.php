<?php

namespace Core;

use PDO;
use PDOException;

class DB {
    private static $connect = null;
    protected $table = '';
    protected $select = [];
    protected $where = [];
    protected $offset = 0;
    protected $limit = 0;
    protected $orderBy = '';

    function __construct($table) {
        $this->table = $table;
    }

    public static function openConnection() {
        try {
            if(self::$connect === null) {
                $db_config = CONFIG['database'];
                self::$connect = new PDO('mysql:host='.$db_config['host'].';dbname='.$db_config['db_name'].'', $db_config['username'], $db_config['password']);
                self::$connect->exec("SET NAMES 'utf8'");
            }
        } catch (PDOException $ex) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode([
                'error'   => 'Error Connection SQL',
                'message' => $ex->getMessage()
            ]);
            exit;
        }
    }

    public static function table($table) {
        $db = new DB($table);
        return $db;
    }

    public function all() {
        return $this->get();
    }

    public function get() {
        // SELECT [*] FROM table [WHERE abc=xyz [LIMIT=x [OFFSET=x

        $select = $this->buildSelect();
        $where = $this->buildWhere();
        $offset = $this->offset ? "OFFSET ?" : "";
        $limit = $this->limit ? "LIMIT ?" : "";

        $data = $where['values'];

        if($this->limit) {
            $data[] = $this->limit;
        } else if($this->offset) {
            $limit = "LIMIT ?";
            $data[] = PHP_INT_MAX;
        }
        
        if($this->offset) {
            $data[] = $this->offset;
        }

        $sql = "SELECT $select FROM $this->table $where[where] $this->orderBy $limit $offset";

        $statement = self::$connect->prepare($sql);

        $index = 1;
        foreach($data as $value) {
            $statement->bindValue($index++, $value, gettype($value) != 'string' ? PDO::PARAM_INT : PDO::PARAM_STR);
        }

        $statement->execute();

        $returnData = [];
        while($object = $statement->fetchObject()) {
            $returnData[] = $object;
        }

        return $returnData;
    }

    public function find($id) {
        // SELECT [*] FROM table WHERE id=x LIMIT 1
        
        $record = $this->where(['id' => $id])->limit(1)->get();
        return $record[0] ?? null;
    }

    public function first() {
        // SELECT [*] FROM table WHERE id=x LIMIT 1
        
        $record = $this->limit(1)->get();
        return $record[0] ?? null;
    }

    public function insert($data = []) {
        // INSERT INTO table([fields]) VALUES([values])

        $fields = implode(', ', array_keys($data));
        $values = implode(', ', array_fill(0, count($data), '?'));

        $sql = "INSERT INTO $this->table($fields) VALUES($values)";
        $statement = self::$connect->prepare($sql);

        $index = 1;
        foreach($data as $value) {
            $statement->bindValue($index++, $value, gettype($value) != 'string' ? PDO::PARAM_INT : PDO::PARAM_STR);
        }
        $statement->execute();

        return $statement->rowCount();
    }

    public function update($data = []) {
        // UPDATE table SET abc=xyz [WHERE id=x

        $fields = [];

        foreach($data as $key => $value) {
            $fields[] = "$key = ?";
        }

        $fieldStr = implode(', ', $fields);
        
        $where = $this->buildWhere();

        $sql = "UPDATE $this->table SET $fieldStr $where[where]";
        $statement = self::$connect->prepare($sql);

        $data = array_merge(array_values($data), $where['values']);

        $index = 1;
        foreach($data as $value) {
            $statement->bindValue($index++, $value, gettype($value) != 'string' ? PDO::PARAM_INT : PDO::PARAM_STR);
        }
        $statement->execute();

        return $statement->rowCount();
    }

    public function delete() {
        // DELETE FROM table [WHERE id=x

        $where = $this->buildWhere();

        $sql = "DELETE FROM $this->table $where[where]";
        $statement = self::$connect->prepare($sql);
        
        $data = array_values($where['values']);

        $index = 1;
        foreach($data as $value) {
            $statement->bindValue($index++, $value, gettype($value) != 'string' ? PDO::PARAM_INT : PDO::PARAM_STR);
        }
        $statement->execute();

        return $statement->rowCount();
    }

    public function count() {
        $sql = "SELECT COUNT(*) AS count FROM $this->table";
        $statement = self::$connect->prepare($sql);
        $statement->execute();
        return $statement->fetchColumn();
    }

    public function select($data = [], $instance = null) {
        $this->select = $data;

        return $instance ?? $this;
    }

    private function buildSelect() {
        if(count($this->select) == 0) {
            return '*';
        }
        return implode(', ', $this->select);
    }

    public function where($data = [], $instance = null) {
        $this->where = $data;

        return $instance ?? $this;
    }

    private function buildWhere() {
        $fields = [];

        $values = [];
        foreach($this->where as $key => $value) {
            if(gettype($value) == 'array') {
                $fields[] = "$key $value[0] ?";
                $values[] = $value[1];
            } else {
                $fields[] = "$key = ?";
                $values[] = $value;
            }
        }

        return [
            'where' => count($fields) ? "WHERE ".implode('AND ', $fields) : '',
            'values' => $values,
        ];
    }

    public function orderBy($column, $type = 'asc', $instance = null) {
        $this->orderBy = "ORDER BY $column $type";

        return $instance ?? $this;
    }

    public function offset($n, $instance = null) {
        $this->offset = (int) $n;

        return $instance ?? $this;
    }

    public function limit($n, $instance = null) {
        $this->limit = (int) $n;

        return $instance ?? $this;
    }

    public function skip($n) {
        return $this->offset($n);
    }

    public function take($n) {
        return $this->limit($n);
    }

    public function lastInsertId() {
        return self::$connect->lastInsertId();
    }

    // schema
    public function columns() {
        $sql = "SELECT column_name FROM information_schema.columns WHERE table_schema = ? AND table_name = ?";
        
        $statement = self::$connect->prepare($sql);

        $statement->bindValue(1, CONFIG['database']['db_name']);
        $statement->bindValue(2, $this->table);

        $statement->execute();

        $returnData = [];
        while($object = $statement->fetch(PDO::FETCH_ASSOC)) {
            $returnData[] = $object['column_name'];
        }

        return $returnData;
    }

}

DB::openConnection();