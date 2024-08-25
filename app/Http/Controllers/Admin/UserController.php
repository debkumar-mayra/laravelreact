<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
// use Illuminate\Http\Request;
use App\Traits\NameImage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;


class UserController extends Controller
{
    function index()  {
        //  $users = User::role('USER')->paginate(5);
       
        try {
              $users = User::filter(Request::only('name', 'email', 'phone', 'status'))->role('USER')->ordering(Request::only('field_name', 'short_by'))->orderBy('id', 'desc')->paginate(request()->perPage ?? $this->per_page)->withQueryString()
              ->through(fn ($user) => [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'status' => $user->status,
                'profile_photo' => $user->profile_photo ? '/storage/'.$user->profile_photo : null,
                'deleted_at' => $user->deleted_at,
              ]);
      
            $filters = Request::all('name', 'email', 'phone', 'status');
      
            return inertia('Admin/User/List',compact('filters', 'users'));
          } catch (\Exception $e) {
            Log::error(" :: EXCEPTION :: " . $e->getMessage() . "\n" . $e->getTraceAsString());
            return back()->with('error', 'Server error');
          }

          
    }

    public function createUser()
    {
      if (request()->isMethod('post')) {
        request()->validate([
          'first_name' => 'required|max:40',
          'last_name' => 'required|max:40',
          'email' => 'required|email:rfc,dns|unique:users,email',
          'password' => ['required', 'string', Password::min(8)
            ->mixedCase()
            ->numbers()
            ->symbols()
            ->uncompromised()],
          'phone' => 'required|numeric',
          'dob' => 'required|before:5 years ago',
          'profile_photo' => 'required',
          'status' => 'required',
        ]);
  
  
        $user = new User;
        $user->first_name = request()->first_name;
        $user->last_name = request()->last_name;
        $user->email = request()->email;
        $user->password = request()->password;
        $user->phone = request()->phone;
        $user->dob = date('Y-m-d', strtotime(request()->dob));
        $user->status = request()->status ?? 1;
        $user->profile_photo = Request::file('profile_photo') ? Request::file('profile_photo')->store('profile_photo') : null;
        $user->save();
        $user->assignRole('USER');
        session()->flash('success', 'User successfully created');
        return redirect()->route('admin.users');
      }
  
      return Inertia::render('Admin/User/CreateEdit');

    }
  
  
  
    public function editUser(Request $request, User $user)
    {
  
      if (request()->isMethod('post')) {
  
      
        $credentials = request()->validate([
          'first_name' => 'required|max:40',
          'last_name' => 'required|max:40',
          'email' =>  'required|email:rfc,dns|unique:users,email,' . $user->id,
          'phone' => 'required|unique:users,phone,' . $user->id,
          'dob' => 'required|before:5 years ago',
          'status' => 'required',
        ]);
  
        $user->first_name = request()->first_name;
        $user->last_name = request()->last_name;
        $user->email = request()->email;
        $user->phone = request()->phone;
        $user->dob = date('Y-m-d', strtotime(request()->dob));
        $user->status = request()->status ?? 1;
        if (Request::hasFile('profile_photo')) {
          File::delete(storage_path('app/' . $user->profile_photo_path));
          $user->profile_photo = Request::file('profile_photo')->store('profile_photo','public');
        }
        $user->save();
  
        session()->flash('success', 'User successfully updated');
        return redirect()->back();
      }
  
      $user->profile_photo = $user->profile_photo ? '/storage/'.$user->profile_photo : null;
  
  
      return Inertia::render('Admin/User/CreateEdit', compact('user'));
    }


    public function deleteUser(User $user)
    {
      try {
        // File::delete(storage_path('app/' . $user->profile_photo_path));
        $user->delete();
        session()->flash('success', 'User successfully deleted');
        return back();
      } catch (\Exception $e) {
        Log::error(" :: EXCEPTION :: " . $e->getMessage() . "\n" . $e->getTraceAsString());
        return back()->with('error', 'Server error');
      }
    }
  
    public function changeUserStatus(User $user)
    {
      try {
        $user->status = ($user->status == 1) ? 2 : 1;
        $user->save();
        session()->flash('success', 'User status successfully changed');
        return back();
      } catch (\Exception $e) {
        Log::error(" :: EXCEPTION :: " . $e->getMessage() . "\n" . $e->getTraceAsString());
        return back()->with('error', 'Server error');
      }
    }
}