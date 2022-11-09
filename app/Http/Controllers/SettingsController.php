<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/Index');
    }
    public function site()
    {
        return Inertia::render('Settings/Site');
    }
    public function learningContent()
    {
        return Inertia::render('Settings/LearningContent');
    }
    public function ordersAccounts()
    {
        return Inertia::render('Settings/OrdersAccounts');
    }
    public function payments()
    {
        return Inertia::render('Settings/Payments');
    }
    public function codeAnalytics()
    {
        return Inertia::render('Settings/CodeAnalytics');
    }

}
