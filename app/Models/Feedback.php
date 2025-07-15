<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'product_id',
        'path',
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
