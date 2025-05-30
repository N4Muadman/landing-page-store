<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Service\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(protected AuthService $auth_service) {}


    public function login()
    {
        return view('admin.auth.login');
    }


    public function postLogin(LoginRequest $request)
    {
        if ($this->auth_service->login($request->validated())) {
            $request->session()->regenerate();
            return redirect()->intended('admin')->with('success', 'Đăng nhập thành công');
        }

        return back()->withErrors([
            'email' => 'Thông tin đăng nhập không chính xác.',
        ])->onlyInput('email');
    }

    public function logout(Request $request){
        if ($this->auth_service->logout($request)){
            return redirect()->route('login')->with('success', 'Đăng xuất thành công');
        }

        return redirect()->route('login')->with('error', 'Vui lòng đăng nhập trước');
    }
}
