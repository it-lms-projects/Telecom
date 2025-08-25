<?php

namespace App\Http\Controllers;

use Log;
use Exception;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Models\Driver;
use App\Models\Vehicle;
use App\Models\WorkJob;
use App\Models\JobTask;

class JobsController extends Controller
{
    /**
     * Get the work jobs of a given date
     * @param Request $request
     * @return JsonResponse
     */
    public function getJobs(Request $request): JsonResponse
    {
        try {
            $query = $request->input('query');

            $jobs = WorkJob::orderBy('id', 'desc')->get(); // WorkJob::whereDate('start_date', $jobDate)->get();
            $result = [];

            foreach($jobs as $job) {
                $result[] = [
                    'id'            => $job->id,
                    'startDate'     => $job->start_date == null ? '' : Carbon::parse($job->start_date)->format('d.m.Y'),
                    'location'      => $job->location,
                    'relation'      => $job->relation,
                    'jobNumber'     => $job->job_number,
                    'fleetNumber'   => $job->vehicle->reference_interne,
                    'endDate'       => $job->end_date == null ? '' : Carbon::parse($job->end_date)->format('d.m.Y'),
                    'duration'      => $job->duration,
                    'destination'   => $job->destination,
                    'indexKm'       => $job->kilometer_index,
                    'status'        => $job->status ?? ["state" => "pending", "message" => ""],
                    'driver'        => $job->driver->prenom.' '.$job->driver->nom.' '.$job->driver->postnom,
                ];
            }

            return response()->json(
                data: [
                    'success' => true,
                    'status' => 'success',
                    'result' => $result,
                    'count' => count($result),
                ],
                status: 200,
            );
        } 
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Error while fetching data',
                    'raw_message' => $ex->getMessage(),
                    'result' => [],
                    'count' => 0,
                ],
                status: 200,
            );
        }
    }

    /**
     * Get the job by id and its related fields
     * @param Request $request
     * @return JsonResponse
     */
    public function getJobDetails(Request $request): JsonResponse
    {
        try {
            $jobId = $request->integer('jobId');
            $job = WorkJob::with(['vehicle', 'driver', 'tasks'])->find($jobId);

            if (!$job) {
                return response()->json(
                    data: [
                        'success' => false,
                        'status'  => 'error',
                        'message' => 'Job not found',
                    ],
                    status: 404,
                );
            }

            $rowId = 1;
            $tasks = [];
            foreach($job->tasks as $task) {
                $status = $task->status ?? ["state" => "pending", "message" => "", "agent" => ""];
                $tasks[] = [
                    'dbId'          => $task->id,
                    'id'            => $rowId,
                    'title'         => $task->title,
                    'description'   => $task->description,
                    'startDate'     => Carbon::parse($task->begin_date)->format('c'),
                    'endDate'       => Carbon::parse($task->end_date)->format('c'),
                    'status'        => $status['state'],
                    'agent'         => $status['agent'],
                    'message'       => $status['message'],
                    'canDelete'     => false,
                ];
                $rowId++;
            }

            $jobDetails = [
                'id'            => $job->id,
                'title'         => $job->job_number,
                'startDate'     => Carbon::parse($job->start_date)->format('c'),
                'endDate'       => Carbon::parse($job->end_date)->format('c'),
                'duration'      => $job->duration,
                'location'      => $job->location,
                'destination'   => $job->destination,
                'relation'      => $job->relation,
                'indexKm'       => $job->kilometer_index,
                'status'        => $job->status ?? json_decode('{"state": "pending","message": ""}'),
                'truckId'       => $job->vehicle ? $job->vehicle->id : -1,
                'driverId'      => $job->driver ? $job->driver->id : -1,
                'tasks'         => $tasks,
            ];

            return response()->json(
                data: [
                    'success'   => true,
                    'status'    => 'success',
                    'result'    => $jobDetails,
                ],
                status: 200,
            );
        } 
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success'       => false,
                    'status'        => 'error',
                    'message'       => 'Error while fetching job details',
                    'raw_message'   => $ex->getMessage(),
                ],
                status: 500,
            );
        }
    }

    public function getAllTrucks(Request $request): JsonResponse {
        $vehicles = Vehicle::all();
        $result = [];

        foreach($vehicles as $vehicle) {
            $result[] = [
                'id' => $vehicle->id,
                'referenceInterne' => $vehicle->reference_interne,
                'type' => ($vehicle && $vehicle->vehicleType) ? $vehicle->vehicleType->designation : '',
            ];
        }

        return response()->json([
            'status' => 'success',
            'result' => $result,
            'count' => count($result),
        ]);
    }

    public function getAllDrivers(Request $request): JsonResponse {
        $drivers = Driver::all()->toArray();
        return response()->json([
            'status' => 'success',
            'result' => $drivers,
            'count'  => count($drivers),
        ]);
    }

    /**
     * If the work job exists, update different fields else create it
     * @param Request $request
     * @return JsonResponse
     */
    public function addOrUpdate(Request $request): JsonResponse {
        $editMode       = $request->boolean('editMode');
        $id             = $request->integer('id');
        $title          = $request->string('title');
        $startDate      = $request->date('startDate');
        $endDate        = $request->date('endDate');
        $relation       = $request->input('relation')['title'] ?? '';
        $truckId        = $request->integer('truckId');
        $kilometerIndex = $request->integer('indexKm');
        $driverId       = $request->integer('driverId');
        $location       = $request->string('location');
        $destination    = $request->string('destination');
        $tasks          = $request->input('tasks');
        
        try {
            $workJob = WorkJob::find($id);
            if (is_null($workJob)) {
                // 1. Create a work job
                $workJob = new WorkJob();                
            }            
            // 1. Update the WokJob fields
            $workJob->job_number = $title;
            $workJob->id_vehicule = $truckId;
            $workJob->id_driver = $driverId;
            $workJob->relation = $relation;
            if($endDate != null) {
                $diff = $startDate->diff($endDate);
                $workJob->duration = "{$diff->d} days {$diff->h} hours";
            } 
            else {
                $workJob->duration = 'Non défini';
            }
            $workJob->start_date = $startDate;
            $workJob->end_date = $endDate;
            $workJob->location = $location;
            $workJob->destination = $destination;
            $workJob->kilometer_index = $kilometerIndex;
            $workJob->save();

            // 2. Add or Update all tasks
            foreach($tasks as $task) {
                $taskId = intval($task['dbId'] ?? 0);
                $canDelete = boolval($task['canDelete'] ?? false);
                $jobTask = JobTask::find($taskId);
                if(!$jobTask) {
                    $jobTask = new JobTask();
                }
                else {
                    //if the task must be deleted
                    if($canDelete) {
                        $jobTask->delete();
                        continue;
                    }
                }
                $jobTask->id_work_job = $workJob->id;
                $jobTask->title = $task['title'];
                $jobTask->description = $task['description'];
                $jobTask->begin_date = Carbon::parse($task['startDate']);
                $jobTask->end_date = Carbon::parse($task['endDate']);
                $jobTask->status = [
                    'state'     => $task['status'] ?? 'pending', 
                    'message'   => $task['message'] ?? '', 
                    'agent'     => $task['agent'] ?? '',
                ];
                $jobTask->save();
            }

            return response()->json(
                            data: [
                                'success'   => true,
                                'status'    => 'success',
                                'message'   => "The work job has been " . ($editMode ? 'inserted' : 'updated') . " successfully !",
                            ], 
                            status: 200,
                        );
        }
        catch (Exception $ex) {
            return response()->json(
                        data: [
                            'success'       => false,
                            'status'        => 'error',
                            'message'       => 'Error while trying to add or update a work job !',
                            'raw_message'   => $ex->getMessage(),
                        ], 
                        status: 500,
                    );
        }
    }

    public function deleteJob(Request $request): JsonResponse {
        try {
            $jobId = $request->integer('jobId');
            $job = WorkJob::find($jobId);
            if (!$job) {
                return response()->json(
                    data: [
                        'success' => false,
                        'status' => 'error',
                        'message' => 'Job not found',
                    ],
                    status: 404,
                );
            }
            $job->delete();
            return response()->json([
                'status' => 'success',
                'result' => 'La tâche '.$job->job_number.' a été supprimée avec succès !',
            ]);
        } 
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Erreur Système: impossible de supprimer la tâche !',
                    'raw_message' => $ex->getMessage(),
                ],
                status: 500,
            );
        }
    }

    public function duplicateJob(Request $request): JsonResponse {
        try {
            $jobId = $request->integer('jobId');
            $originalJob = WorkJob::with(['tasks'])->find($jobId);

            if (!$originalJob) {
                return response()->json(
                    data: [
                        'success' => false,
                        'status' => 'error',
                        'message' => 'Job not found',
                    ],
                    status: 404,
                );
            }

            // Duplicate the job
            $newJob = $originalJob->replicate();
            $newJob->job_number = $this->generateNewJobNumber();
            $newJob->status = json_encode(['state' => 'pending', 'message' => '']);
            $newJob->save();

            // Duplicate the tasks
            foreach ($originalJob->tasks as $task) {
                $newTask = $task->replicate();
                $newTask->id_work_job = $newJob->id;
                $newTask->save();
            }

            return response()->json(
                data: [
                    'success' => true,
                    'status' => 'success',
                    'result' => $newJob,
                    'message' => 'Job duplicated successfully!',
                    'newJobId' => $newJob->id,
                ],
                status: 200,
            );
        } 
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Error while duplicating the job!',
                    'raw_message' => $ex->getMessage(),
                ],
                status: 500,
            );
        }
    }

    private function generateNewJobNumber(): string {
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now();
        $job = WorkJob::whereBetween('start_date', [$startDate, $endDate])->orderBy('created_at', 'desc')->first();
        if($job) {
            $jobNumber = $job->job_number;
            $jobNumberParts = explode('.', $jobNumber);
            $jobsCount = intval($jobNumberParts[2]);
            return 'JOB.' . Carbon::now()->format('Ym') . '.' . str_pad($jobsCount + 1, 4, '0', STR_PAD_LEFT);
        }
        return 'JOB.' . Carbon::now()->format('Ym') . '.' . str_pad("1", 4, '0', STR_PAD_LEFT);
    }

    public function completeJob(Request $request): JsonResponse {
        try {
            $jobId = $request->integer('jobId');
            $job = WorkJob::find($jobId);
            if (!$job) {
                return response()->json(
                    data: [
                        'success' => false,
                        'status' => 'error',
                        'message' => 'Job not found',
                    ],
                    status: 404,
                );
            }
            $job->status = ['state' => 'completed', 'message' => ''];
            $job->save();
            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'La tâche '.$job->job_number.' a été complété avec succès !',
            ]);
        }
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Erreur Système: impossible de completer la tâche !',
                    'raw_message' => $ex->getMessage(),
                ],
                status: 500,
            );
        }
    }
    
    /**
     * Cancel a job
     * @param Request $request
     * @return JsonResponse
     */
    public function cancelJob(Request $request): JsonResponse {
        try {
            $jobId = $request->integer('jobId');
            $job = WorkJob::find($jobId);
            if (!$job) {
                return response()->json(
                    data: [
                        'success' => false,
                        'status' => 'error',
                        'message' => 'Job not found',
                    ],
                    status: 404,
                );
            }
            $job->status = ['state' => 'cancelled', 'message' => ''];
            $job->save();
            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'La tâche '.$job->job_number.' a été annulée avec succès !',
            ]);
        }
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Erreur Système: impossible de completer la tâche !',
                    'raw_message' => $ex->getMessage(),
                ],
                status: 500,
            );
        }
    }

    public function resetJob(Request $request): JsonResponse {
        try {
            $jobId = $request->integer('jobId');
            $job = WorkJob::find($jobId);
            if (!$job) {
                return response()->json(
                    data: [
                        'success' => false,
                        'status' => 'error',
                        'message' => 'Job not found',
                    ],
                    status: 404,
                );
            }
            $job->status = ['state' => 'pending', 'message' => ''];
            $job->save();
            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'La tâche '.$job->job_number.' a été réinitialisée avec succès !',
            ]);
        }
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Erreur Système: impossible de completer la tâche !',
                    'raw_message' => $ex->getMessage(),
                ],
                status: 500,
            );
        }
    }

    /**
     * Complete a task
     * @param Request $request
     * @return JsonResponse
     */

    public function completeTask(Request $request): JsonResponse {
        try {
            $taskId = $request->integer('taskId');
            $task = JobTask::find($taskId);
            if (!$task) {
                return response()->json(
                    data: [
                        'success' => false,
                        'status' => 'error',
                        'message' => 'Aucune tâche trouvée',
                    ],
                    status: 404,
                );
            }
            $task->status = json_encode(['state' => 'completed', 'message' => '']);
            $task->save();
            return response()->json([
                'status' => 'success',
                'result' => 'Le tache '.$task->title.' a été complété avec succès !',
            ]);
        }
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Erreur Système: impossible de completer la tâche !',
                    'raw_message' => $ex->getMessage(),
                ],
                status: 500,
            );
        }
    }

    public function getOngoingJobs(Request $request): JsonResponse {
        return response()->json([
            'status' => 'success',
            'result' => '',
        ]);
    }

    public function getCompletedJobs(Request $request): JsonResponse {
        return response()->json([
            'status' => 'success',
            'result' => '',
        ]);
    }

    /**
     * Generate the next job sequence according to this format: JOB.YYYYMMDD.XXXX
     * @param Request $request
     * @return JsonResponse
     */
    public function getNextJobSequence(Request $request): JsonResponse {
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now();        
        // Get the number of jobs created in the current month
        $jobsCount = WorkJob::whereBetween('start_date', [$startDate, $endDate])->count();
        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'The next job sequence has been generated successfully !',
            'sequence' => 'JOB.'.Carbon::now()->format('Ym').'.'.str_pad($jobsCount + 1, 4, '0', STR_PAD_LEFT),
        ]);
    }
}
