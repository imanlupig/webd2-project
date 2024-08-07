<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['page_id', 'filename'];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}