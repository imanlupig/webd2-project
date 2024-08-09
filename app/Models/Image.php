<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['filename', 'page_id'];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
