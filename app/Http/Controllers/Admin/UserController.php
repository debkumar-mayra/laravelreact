<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;


class UserController extends Controller
{
    function index()  {
        //  $users = User::role('USER')->paginate(5);

        try {
              $users = User::filter(Request::only('name', 'email', 'phone', 'active'))->role('USER')->ordering(Request::only('fieldName', 'shortBy'))->orderBy('id', 'desc')->paginate(request()->perPage ?? $this->per_page)->withQueryString()
              ->through(fn ($user) => [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'active' => $user->active,
                'profile_photo' => $user->profile_photo_path ? URL::route('image', ['path' => $user->profile_photo_path, 'w' => 40, 'h' => 40, 'fit' => 'crop']) : null,
                'deleted_at' => $user->deleted_at,
              ]);
      
            $filters = Request::all('name', 'email', 'phone', 'active');
      
            return inertia('Admin/User/List',compact('filters', 'users'));
          } catch (\Exception $e) {
            Log::error(" :: EXCEPTION :: " . $e->getMessage() . "\n" . $e->getTraceAsString());
            return back()->with('error', 'Server error');
          }

          
    }
}