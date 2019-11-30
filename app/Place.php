<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Place extends Model
{
    protected $fillable = ['name'];
    public $timestamps = false;

    use SoftDeletes;
    protected $dates = ['deleted_at'];
    public function warehouses(){
        return $this->hasMany('App\Warehouse');

    }
    public function good(){
        return $this->hasMany('App\Good');
    }


    public function setNameAttribute($value){
        $this->attributes['name'] = strip_tags($value);
    }


    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('d/m/Y');
    }
    public function getUpdatedAtAttribute($value){
        return Carbon::parse($value)->format('d/m/Y');
    }
    public function getDeletedAtAttribute($value){
        return Carbon::parse($value)->format('d/m/Y');
    }
}
