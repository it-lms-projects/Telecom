<?php

namespace App\Models;

use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WorkJob extends Model implements AuditableContract
{
    use HasFactory, Auditable;    

    /**
     * Should the audit be strict?
     *
     * @var bool
     */
    protected $auditStrict = true;

    /**
     * Should the timestamps be audited?
     *
     * @var bool
     */
    protected $auditTimestamps = true;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'work_jobs';

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
        'id_vehicule', 
        'id_driver', 
        'relation', 
        'duration',
        'start_date', 
        'end_date', 
        'location', 
        'destination', 
        'kilometer_index',
    ];

    protected $attributes = [        
        'status' => '{"state": "pending", "message": ""}',
    ];

    protected $casts = [
        'status' => 'array',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'start_date',
        'end_date',
    ];

    public function tasks() {
        return $this->hasMany(JobTask::class, 'id_work_job');
    }

    public function vehicle() {
        return $this->belongsTo(Vehicle::class, 'id_vehicule');
    }

    public function driver() {
        return $this->belongsTo(Driver::class, 'id_driver');
    }
}
