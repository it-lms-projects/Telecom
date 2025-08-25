<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    public function view() {
        return $this->belongsTo(View::class);
    }
}
