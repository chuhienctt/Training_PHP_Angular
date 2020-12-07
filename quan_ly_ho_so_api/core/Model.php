<?php

namespace Core;

class Model {
    protected $table = '';
    private $db = [];
    protected $columns = [];

    public function __construct() {
        $this->db = new DB($this->table);
        $this->columns = $this->db->columns();
    }

    public function all() {
        return $this->cast($this->db->all());
    }

    public function get() {
        return $this->cast($this->db->get());
    }

    public function find($id) {
        return $this->castObject($this->db->find($id));
    }

    public function first() {
        return $this->castObject($this->db->first());
    }

    public function insert($data) {
        return $this->db->insert($data);
    }

    public function update($data) {
        return $this->db->update($data);
    }

    public function delete() {
        return $this->db->delete();
    }

    public function select($data) {
        return $this->db->select($data, $this);
    }

    public function where($data) {
        return $this->db->where($data, $this);
    }

    public function orderBy($column, $type = 'asc') {
        return $this->db->orderBy($column, $type, $this);
    }

    public function offset($n) {
        return $this->db->offset($n, $this);
    }

    public function limit($n) {
        return $this->db->limit($n, $this);
    }

    public function skip($n) {
        return $this->offset($n);
    }

    public function take($n) {
        return $this->limit($n);
    }

    public function save() {
        $data = [];

        foreach($this->columns as $column) {
            if($column != 'id') {
                if(isset($this->{$column})) {
                    $data[$column] = $this->{$column};
                } else {
                    $data[$column] = null;
                }
            }
        }
        
        if(isset($this->id)) {
            // update
            return $this->db->update($data);
        } else {
            // insert
            return $this->db->insert($data);
        }
    }

    public function hasMany($model, $foreign_key) {
        return model($model)->where([
            $foreign_key => $this->id
        ])->get();
    }

    public function belongsTo($model, $foreign_key) {
        return model($model)->find($this->{$foreign_key});
    }

    private function cast($data) {
        return array_map(function($object) {
            return $this->castObject($object);
        }, $data);
    }

    private function castObject($instance) {
        $className = static::class;

        $modelName = substr($className, strripos($className, '\\') + 1);

        $model = clone model($modelName);

        foreach($this->columns as $column) {
            if(isset($instance->{$column})) {
                $model->{$column} = $instance->{$column};
            } else {
                if($column == 'id') {
                    return null;
                }
                $model->{$column} = null;
            }
        }

        return $model;
        
        // return unserialize(sprintf(
        //     'O:%d:"%s"%s',
        //     strlen($className),
        //     $className,
        //     strstr(strstr(serialize($instance), '"'), ':')
        // ));
    }
}