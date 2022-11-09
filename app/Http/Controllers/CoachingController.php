<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CoachingController extends Controller
{
    public function index()
    {
        return Inertia::render('Coaching/Index');
    }
    //
}
