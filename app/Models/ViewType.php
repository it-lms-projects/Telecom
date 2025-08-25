<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewType extends Model
{
    public function views()
    {
        return $this->belongsToMany(View::class);
    }
}
