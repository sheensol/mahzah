<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CourseResource;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\UserRestoreRequest;
use App\Http\Requests\UserUpdateMyProfileRequest;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::orderBy('first_name')
            ->filter(Request::only('search', 'role', 'trashed'))
            ->paginate()
            ->appends(Request::all());

        return Inertia::render('Users/Index', [
            'filters' => Request::only('search', 'role', 'trashed'),
            'roles' => RoleResource::collection(Role::get()),
            'users' => UserResource::collection($users),
        ]);
    }

    public function create()
    {
        $courses = Course::where('creator_id', Auth::id())->get();
        return Inertia::render('Users/Create', [
            'roles' => RoleResource::collection(Role::get()),
            'courses' => CourseResource::collection($courses)
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        DB::beginTransaction();
        try {

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => $request->password,
                'type' => User::DEFAULT
            ]);

            $user->roles()->sync($request->roles, true);

            if (!empty($request->enrollments)) {
                foreach ($request->enrollments as $enrollment) {
                    $course = Course::find($enrollment['id']);
                    $user->enrollments()->save($course, ['expiry_date' => $enrollment['expiry_date'] ?? NULL]);
                }
            }

            DB::commit();
            return Redirect::route('users.index')
                ->with('success', 'User created successfully.');
        } catch (Throwable $e) {
            DB::rollback();
            return Redirect::back()
                ->with('error', 'User could not be created.' . $e->getMessage());
        }
    }

    public function myProfile()
    {
        $user = User::find(Auth::id());
        return Inertia::render('Users/MyProfile', [
            'user' => new UserResource($user)
        ]);
    }

    public function updateMyProfile(User $user, UserUpdateMyProfileRequest $request)
    {
        try {

            $user->update(
                $request->validated()
            );

            return Redirect::back()
                ->with('success', 'Profile updated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'Profile could not be updated.');
        }
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
            'roles' => RoleResource::collection(Role::get())
        ]);
    }

    public function update(User $user, UserUpdateRequest $request)
    {
        try {

            $user->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => $request->password
            ]);

            $user->roles()->sync($request->roles, true);

            return Redirect::back()->with('success', 'User updated successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'User could not be updated.');
        }
    }


    public function destroy(User $user, UserDeleteRequest $request)
    {
        try {

            $user->delete();
            return Redirect::back()->with('success', 'User deleted successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'User could not be deleted.');
        }
    }

    public function restore(User $user, UserRestoreRequest $request)
    {
        try {

            $user->restore();
            return Redirect::back()->with('success', 'User restored successfully.');
        } catch (Throwable $e) {
            return Redirect::back()
                ->with('error', 'User could not be restored.');
        }
    }
}
