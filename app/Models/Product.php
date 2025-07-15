<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'name',
        'slug',
        'description',
        'sold',
        'count_reviews',
        'star',
        'price',
        'discount',
        'name_option',
        'pixel_fb',
        'layout',
    ];

    public function images(){
        return $this->hasMany(Image::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function options(){
        return $this->hasMany(ProductOption::class);
    }

    public function feedbacks(){
        return $this->hasMany(Feedback::class);
    }

    public function contacts(){
        return $this->hasMany(Order::class);
    }

}
