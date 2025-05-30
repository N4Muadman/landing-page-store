<?php

namespace App\Service;

use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function login($request)
    {
        return Auth::attempt($request, true);
    }

    public function logout($request): bool
    {
        if (Auth::check()) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return true;
        }

        return false;
    }
}
