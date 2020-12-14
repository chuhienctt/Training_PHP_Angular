<?php

namespace Core;

class Model {
    protected $table = '';
    private $db = [];
    protected $columns = [];
    private $original_data = [];

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

    public function count() {
        return $this->db->count();
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
                    $override = true;

                    if(isset($this->original_data[$column]) && $this->original_data[$column] == $this->{$column}) {
                        $override = false;
                    }

                    $override && $data[$column] = $this->{$column};
                }
            }
        }
        
        if(isset($this->id)) {
            // update
            if(in_array('updated_at', $this->columns)) {
                $data['updated_at'] = $this->updated_at = Format::timeNow();
            }
            if(count($data) == 0) {
                return 1;
            }
            return $this->db->update($data);
        } else {
            // insert
            if(in_array('created_at', $this->columns)) {
                $data['created_at'] = $this->created_at = Format::timeNow();
            }

            $row = $this->db->insert($data);
            if($row) {
                $this->id = $this->db->lastInsertId();
                $this->updateValues();
            }
            return $row;
        }
    }

    public function hasMany($model, $foreign_key, $model2 = null, $foreign_key2 = null) {

        $data = model($model)->where([
            $foreign_key => $this->id
        ])->get();

        if($model2 && $foreign_key2) {
            $new_data = [];

            foreach($data as $item) {
                $new_data[] = $item->belongsTo($model2, $foreign_key2);
            }

            $data = $new_data;
        }

        return $data;
    }

    public function belongsTo($model, $foreign_key) {
        return model($model)->find($this->{$foreign_key});
    }

    private function updateValues() {
        $db = new DB($this->table);
        $table = $db->find($this->id);

        foreach($this->columns as $column) {
            if(isset($table->{$column})) {
                $this->original_data[$column] = $this->{$column} = $table->{$column};
            } else {
                $this->{$column} = null;
            }
        }
    }

    private function cast($data) {
        return array_map(function($object) {
            return $this->castObject($object);
        }, $data);
    }

    private function castObject($instance) {

        $modelName = $this->getModelName();
        
        $model = clone model($modelName);
        $model->original_data = [];

        foreach($this->columns as $column) {
            if(isset($instance->{$column})) {
                $model->original_data[$column] = $model->{$column} = $instance->{$column};
            } else {
                if($column == 'id') {
                    return null;
                }
                $model->{$column} = null;
            }
        }

        return $model;
    }

    public function getModelName() {
        $className = static::class;
        $modelName = substr($className, strripos($className, '\\') + 1);
        return $modelName;
    }
}