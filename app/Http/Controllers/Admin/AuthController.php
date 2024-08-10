<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    

    function login(Request $request)
    {
        if(Auth::check() && Auth::user()->role_name == 'SUPER-ADMIN'){
            return redirect('/admin/dashboard');
        }

        if ($request->isMethod('post')) {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
    
            if (Auth::attempt($credentials) && Auth::user()->role_name == 'SUPER-ADMIN') {
                $request->session()->regenerate();
                return redirect()->intended('admin/dashboard');
            }
    
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email');

        }

        return Inertia::render('Auth/AdminLogin');
    }

    function dashboard()  {
        return inertia('Admin/Dashboard');
    
    }


    function profile(Request $request)  {
        if ($request->isMethod('post')) {
            $validation = $request->validate([
                'first_name' => ['required'],
                'last_name' => ['required'],
                'email' => ['required', 'email',"unique:users,email,".auth()->id()],
            ]);

            $user = Auth::user();
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->save();

            return back()->with('success', 'Profile updated successfully.');
        }
        $user = Auth::user();
        
        return inertia('Admin/Profile',compact('user'));
    }

    function changePassword(Request $request) {
        $validation = $request->validate([
            'old_password' => ['required'],
            'password' => ['required'],
            'confirm_password' => ['required'],
        ]);

        dd($request->all());
    }

}