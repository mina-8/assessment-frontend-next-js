<?php

use App\Http\Controllers\JobBoardController;
use App\Http\Controllers\JobTypesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});


Route::get('/jobs' , [JobBoardController::class , 'index']);

Route::post('/jobs' , [JobBoardController::class , 'store']);

Route::get('/filters' , [JobTypesController::class , 'index']);
