<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $fillable = [
        'good_id',
        'place_id',
        'amt',
        'balance'
    ];



    public function good(){
        return $this->belongsTo('App\Good');
    }
    public function place(){
        return $this->belongsTo('App\Place');
    }
    public function getDateAttribute($value){
        return Carbon::parse($value)->format('d/m/Y');
    }

    public function setGoodIdAttribute($value){
        $this->attributes['good_id'] = strip_tags($value);
    }
    public function setPlaceIdAttribute($value){
        $this->attributes['place_id'] = strip_tags($value);
    }
    public function setAmtAttribute($value){
        $this->attributes['amt'] = strip_tags($value);
    }
    public function setBalanceAttribute($value){
        $this->attributes['balance'] = strip_tags($value);
    }


    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('d/m/Y');
    }
    public function getUpdatedAtAttribute($value){
        return Carbon::parse($value)->format('d/m/Y');
    }
}
