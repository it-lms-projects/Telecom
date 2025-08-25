<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    public function view() {
        return $this->belongsTo(View::class);
    }
}
