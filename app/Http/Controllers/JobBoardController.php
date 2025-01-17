<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobValidationRequest;
use App\Models\JobBoard;
use Illuminate\Http\Request;

class JobBoardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        
        $ALLJobs = JobBoard::orderByDesc('id')
                            ->get();

        return response()->json($ALLJobs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobValidationRequest $request)
    {

        $validateddata = $request->validated();

        JobBoard::create($validateddata);

        return response()->json(['message' => 'Job created successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(JobBoard $jobBoard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobBoard $jobBoard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobBoard $jobBoard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobBoard $jobBoard)
    {
        //
    }
}
