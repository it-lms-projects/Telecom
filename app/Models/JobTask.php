<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobTask extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'job_tasks';

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
        'id_work_job',
        'title',
        'description',
        'begin_date',
        'end_date',        
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['begin_date', 'end_date'];

    protected $attributes = [
        'status' => '{"state": "pending", "message": "", "agent": ""}',        
    ];

    protected $casts = [
        'status' => 'array',
    ];

    public function workJob() {
        return $this->belongsTo(WorkJob::class, 'id_work_job');
    }
}