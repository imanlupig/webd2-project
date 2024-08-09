<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['content', 'user_id', 'page_id'];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}