<?php

namespace App\Http\Controllers;

use App\Models\WorkJob;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use PDF;

class ReportController extends Controller
{
    /**
     * Generates the PDF report of the selected 
     */
    public function getWorkJobReport(Request $request)
    {
        try {
            $jobId = $request->integer('jobId');
            $job = WorkJob::with(['vehicle', 'driver', 'tasks'])->find($jobId);

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

            $rowId = 1;
            $tasks = [];
            foreach($job->tasks as $task) {
                $tasks[] = [
                    'dbId' => $task->id,
                    'id' => $rowId,
                    'title' => $task->title,
                    'description' => $task->description,
                    'startDate' => Carbon::parse($task->begin_date)->format('d/m/Y'),
                    'endDate' => Carbon::parse($task->end_date)->format('d/m/Y'),
                    'status' => $task->status ?? ["state" => "pending", "message" => "", "agent" => ""],                    
                ];
                $rowId++;
            }

            $jobDetails = [
                'id' => $job->id,
                'title' => $job->job_number,
                'startDate' => Carbon::parse($job->start_date)->format('d/m/Y'),
                'endDate' => Carbon::parse($job->end_date)->format('d/m/Y'),
                'duration' => $job->duration,
                'location' => $job->location,
                'destination' => $job->destination,
                'relation' => $job->relation,
                'truck' => $job->vehicle?->reference_interne,
                'indexKm' => $job->kilometer_index,
                'systemDate' => Carbon::now()->format('d/m/Y H:i'),
                'driver' => "{$job->driver?->nom} {$job->driver?->postnom} {$job->driver?->prenom}",
                'tasks' => $tasks,
            ];

            $pdf = PDF::loadView('reportjob', $jobDetails);            
            $pdf->setOption('enable-javascript', true);
            $pdf->setOption('javascript-delay', 5000);
            $pdf->setOption('enable-smart-shrinking', true);
            $pdf->setOption('no-stop-slow-scripts', true);

            return $pdf->download($job->job_number.".pdf");
        } 
        catch (Exception $ex) {
            return response()->json(
                data: [
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Error while fetching job details',
                    'raw_message' => $ex->getMessage(),
                ],
                status: 500,
            );
        }
    }

    private function convertHtmlToPdf($filePath) {
        
    }
}
