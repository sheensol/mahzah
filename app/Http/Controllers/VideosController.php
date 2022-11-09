<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\FileUpload;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\Http\Resources\UploadFilesResource;

class VideosController extends Controller
{
    public function index()
    {
        return Inertia::render('Videos/Index', [
            'filters' => Request::all('search', 'mode'),
            'files' => UploadFilesResource::collection(
                FileUpload::where('creator_id', Auth::id())
                    ->where('is_libaray', true)
                    ->filter(Request::only('search', 'mode'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }
}
