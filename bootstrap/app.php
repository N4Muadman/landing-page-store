<?php

use App\Http\Middleware\CheckLogin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'is_admin' => CheckLogin::class,
        ]);
        $middleware->validateCsrfTokens(except: [
            'place-order',
            'admin/quan-ly-san-pham/*'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {

    })->create();
