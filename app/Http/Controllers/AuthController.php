<?php

namespace App\Http\Controllers;

use App\Events\ChatMessageEvent;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    function login(Request $request)
    {
        if(Auth::check() && Auth::user()->role_name == 'USER'){
            return redirect('/dashboard');
        }

        if ($request->isMethod('post')) {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
    
            if (Auth::attempt($credentials) && Auth::user()->role_name == 'USER') {
                $request->session()->regenerate();
                return redirect()->intended('/dashboard');
            }
    
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email');

        }

        return inertia('Frontend/Login');
    }

    function register(Request $request)
    {
        if ($request->isMethod('post')) {
            $validator = $request->validate([
                "first_name" =>  "required",
                "last_name" =>  "required",
                "country_code" =>  "required",
                "mobile_number" =>  "required",
                "email" =>  "required|email|unique:users,email",
                "password" =>  "required",
                "captcha" =>  "required|captcha"
            ],['captcha.captcha' => 'Please enter a valid captcha.',]);
            $user = new User();
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->country_code = $request->country_code;
            $user->phone = $request->mobile_number;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->save();
            $user->assignRole('USER');
            Session::flash('success', 'Successfully registered');
            return to_route('register');
        }

        $captcha = captcha_src('flat');

        return inertia('Frontend/Registration', compact('captcha'));
    }

    function forgotPassword()
    {
        return inertia('Frontend/ForgotPassword');
    }

    function dashboard()
    {
        return inertia('User/Dashboard');
    }

    public function logout()
    {
        if(auth()->user()->role_name == 'USER'){
            Auth::logout();
            return redirect('/login');
        }
        if(auth()->user()->role_name == 'SUPER-ADMIN'){
            Auth::logout();
            return redirect('/admin/login');
        }
    }

    function reverb()  {
        // dd('hhhhhhhhh');
        broadcast(new ChatMessageEvent('This is a private message'))->toOthers();
        return 'message send';

    }


}