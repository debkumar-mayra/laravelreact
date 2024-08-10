<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'appName' => config('app.name'),
            'auth' => [
                'user' => [
                    'full_name' => auth()->user()->full_name ?? null,
                    'email' => auth()->user()->email ?? null,
                    'profile_photo' =>  isset(auth()->user()->profile_photo_path) ? URL::route('image', ['path' => auth()->user()->profile_photo_path, 'w' => 80, 'h' => 80, 'fit' => 'stretch']) : null,
                ]
            ],
            'baseUrl' => url(),
            'isLogin' => auth()->user() ? true : false,
            'isUser' => (auth()->user() && auth()->user()->role_name == 'USER') ? true : false,
            'isAdmin' => (auth()->user() &&  auth()->user()->role_name == 'SUPER-ADMIN') ? true : false,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'info' => fn () => $request->session()->get('info'),
                'warning' => fn () => $request->session()->get('warning'),
            ],
        ]);
    }
}