<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class PaidGood extends Model

{
    protected $fillable = ['good_id','expense_id','amt','balance'];
    public $table = 'paid_goods';
    public function good(){
        return $this->belongsTo('App\Good');
    }

    public function setGoodIdAttribute($value){
        $this->attributes['good_id'] = strip_tags(intval($value));
    }
    public function setExpenseIdAttribute($value){
        $this->attributes['expense_id'] = strip_tags(intval($value));
    }
    public function setAmtAttribute($value){
        $this->attributes['amt'] = strip_tags(intval($value));
    }
    public function setBalanceAttribute($value){
        $this->attributes['balance'] = strip_tags(intval($value));
    }

    public function getDateAttribute($value){
        return Carbon::parse($value)->format('d/m/Y');
    }
}
