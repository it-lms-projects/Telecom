<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    /**
     * Returns all types of views
     */
    public function viewTypes()
    {
        return $this->belongsToMany(ViewType::class);
    }

    /**
     * Returns all filters available for this view
     */
    public function filters() {
        return $this->hasMany(Filter::class);
    }

    /**
     * Returns all groups available for this view
    */
    public function groups() {
        return $this->hasMany(Group::class);
    }

    /**
     * Returns all saved searches (combination of filters, groups and keyword) for this views
     */
    public function favorites() {
        return $this->hasMany(Favorite::class);
    }
}
