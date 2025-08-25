<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Vehicle;
use App\Models\WorkJob;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Log;

class HomeController extends Controller
{
    // Application entry point
    public function index(): View {
        return view('index');
    }
}
