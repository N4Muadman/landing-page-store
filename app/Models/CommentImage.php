<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommentImage extends Model
{
    protected $fillable = [
        'comment_id',
        'path'
    ];
}
