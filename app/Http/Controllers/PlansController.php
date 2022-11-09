<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PlansController extends Controller
{
    public function index()
    {
        return Inertia::render('Plans/Index');
    }

    public function additionalPlan()
    {
        return Inertia::render('Plans/AdditionalPlan');
    }

    public function primary_plan()
    {
        return Inertia::render('Plans/PrimaryPlan');
    }
}
