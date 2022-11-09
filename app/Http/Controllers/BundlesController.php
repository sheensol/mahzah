<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BundlesController extends Controller
{
    public function index()
    {
        return Inertia::render('Bundles/Index');
    }
    public function bundles()
    {
        return Inertia::render('EditBundles/Courses');
    }
    //
}
