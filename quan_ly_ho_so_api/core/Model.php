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
        return $this->db->select($data);
    }

    public function where($data) {
        return $this->db->where($data);
    }

    public function offset($n) {
        return $this->db->offset($n);
    }

    public function orderBy($column, $type = 'asc') {
        return $this->db->orderBy($column, $type);
    }

    public function limit($n) {
        return $this->db->limit($n);
    }

    public function skip($n) {
        return $this->db->skip($n);
    }

    public function take($n) {
        return $this->db->take($n);
    }

    public function save() {
        $data = [];

        foreach($this->columns as $column) {
            if($column != 'id') {
                $data[$column] = $this->{$column};
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
        
        return unserialize(sprintf(
            'O:%d:"%s"%s',
            strlen($className),
            $className,
            strstr(strstr(serialize($instance), '"'), ':')
        ));
    }
}