<?php

namespace App\Http\Controllers;

use App\Models\JobBoard;
use App\Models\JobTypes;
use Illuminate\Http\Request;

class JobTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $FillterJop = JobBoard::query();

        if($request->has('location')){
            $location = $request->location;

            $FillterJop->whereIn('location' , $location);
        }

        if($request->has('type')){
            $type = $request->type;

            $FillterJop->whereIn('type' , $type);
        }

        if($request->has('salary_range')){
            $salary_range = $request->salary_range;
            foreach($salary_range as $range){
                if(strpos($range , '+') !== false){
                    $baseSalary = (int) rtrim($range , 'k');

                    $FillterJop->where('salary' , '>=' , $baseSalary * 1000);
                }else{
                    list($min , $max) = explode('-' , rtrim($range , 'k'));

                    $minSalary = (int) ($min * 1000);
                    $maxSalary = (int) ($max * 1000);

                    $FillterJop->whereBetween('salary' , [$minSalary , $maxSalary]);
                }
            }
        }

        return response()->json($FillterJop->get());
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(JobTypes $jobTypes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobTypes $jobTypes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobTypes $jobTypes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobTypes $jobTypes)
    {
        //
    }
}
