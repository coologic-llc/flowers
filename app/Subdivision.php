<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subdivision extends Model
{
    protected $fillable = ['name'];



    public $timestamps = false;

    protected $table = 'subdivisions';

    public function good(){
        return $this->hasMany('App\Good');
    }
}
