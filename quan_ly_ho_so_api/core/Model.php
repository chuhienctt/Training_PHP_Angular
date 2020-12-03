<?php

namespace Core;

class Model {
    protected $table = '';
    private static $db = null;
    protected static $columns = [];

    public function __construct() {
        self::$db = new DB($this->table);
        self::$columns = self::$db->columns();
    }

    public static function all() {
        return self::$db->all();
    }

    public static function get() {
        return self::$db->get();
    }

    public static function find($id) {
        return self::$db->find($id);
    }

    public static function insert($data) {
        return self::$db->insert($data);
    }

    public static function update($data) {
        return self::$db->update($data);
    }

    public static function delete() {
        return self::$db->delete();
    }

    public static function select($data) {
        return self::$db->select($data);
    }

    public static function where($data) {
        return self::$db->where($data);
    }

    public static function offset($n) {
        return self::$db->offset($n);
    }

    public static function orderBy($column, $type = 'asc') {
        return self::$db->orderBy($column, $type);
    }

    public static function limit($n) {
        return self::$db->limit($n);
    }

    public static function skip($n) {
        return self::$db->skip($n);
    }

    public static function take($n) {
        return self::$db->take($n);
    }

    public function save() {
        $data = [];

        foreach(self::$columns as $column) {
            if($column != 'id') {
                $data[$column] = $this->{$column};
            }
        }
        
        if(isset($this->id)) {
            // update
            return self::$db->update($data);
        } else {
            // insert
            return self::$db->insert($data);
        }
    }
}