<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'product_id',
        'avatar',
        'name',
        'option',
        'content',
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function images(){
        return $this->hasMany(CommentImage::class);
    }
}
