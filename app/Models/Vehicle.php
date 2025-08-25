<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vehicle extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'vehicules';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'Y-m-d H:i:s';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'immatriculation', 
        'chassis', 
        'reference_interne', 
        'date_mise_en_circulation',
        'id_marque_vehicule', 
        'id_type_vehicule', 
        'kilometre_initial'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function workJobs() {
        return $this->belongsTo(Marque::class, 'id_marque_vehicule');
    }

    public function tradeMark()  {
        return $this->belongsTo(TradeMark::class);
    }

    public function vehicleType() {
        return $this->belongsTo(VehicleType::class, 'id_type_vehicule');
    }
}
