'use client'

import { Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns';
export default function Page() {

    const [Listjobs, setListJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const csrfResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/csrf-token`, {
                method: 'GET',
                credentials: 'include',
            });
            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrfToken;

            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
                headers: {

                    'X-CSRF-TOKEN': csrfToken,
                    'Access-Control-Allow-Origin': '*'
                },
            });
            const jobs = await data.json();
            setListJobs(jobs);
        };
        fetchJobs();
    }, []);


    return (
        <div className='m-4 py-4 px-12 '>
            <h3 className='font-bold text-4xl'>Find your <span className='text-blue-500'>new job</span> today</h3>
            <p className='my-5'>Thousand of jobs in the computer , engineering and technology sectors are waiting for you.</p>
            <div className='flex justify-between items-start gap-4 border p-8 bg-gray-200'>
                <div className='bg-white w-[25%] flex flex-col items-start justify-start p-4 rounded'>
                    <div className='font-bold text-lg mb-4'>Filters</div>
                    <div className='font-bold text-lg my-2'>Location</div>

                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="NearMe"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="NearMe" control={<Radio />} label="Near Me" />
                            <FormControlLabel value="Remotejob" control={<Radio />} label="Remote job" />
                            <FormControlLabel value="Exactlocation" control={<Radio />} label="Exact location" />
                            <FormControlLabel value="Within15km" control={<Radio />} label="Within 15 km" />
                            <FormControlLabel value="Within30km" control={<Radio />} label="Within 30 km" />
                            <FormControlLabel value="Within50km" control={<Radio />} label="Within 50 km" />
                        </RadioGroup>
                    </FormControl>
                    <div className='font-bold text-lg my-2'>Salary</div>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                    <div className='font-bold text-lg my-2'>Type of employment</div>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Full-time" />
                        <FormControlLabel control={<Checkbox />} label="Temporary" />
                        <FormControlLabel control={<Checkbox />} label="Part-time" />
                    </FormGroup>
                </div>
                <div className=' flex-1'>
                    {
                        Listjobs.length > 0 ?
                            Listjobs.map((jobs: { id: number; title: string, description: string, location: string, salary: number, type: string, created_at: string }) =>
                                <div className='bg-white my-5 rounded p-5' key={jobs.id}>
                                    <p className='font-bold text-2lg'>{jobs.title}</p>
                                    <div className='flex justify-between items-center my-2 w-[80%]'>
                                        <p>{jobs.location}</p>
                                        <p>{jobs.type}</p>
                                        <p>{jobs.salary}</p>
                                        <p>{formatDistanceToNow(parseISO(jobs.created_at), { addSuffix: true })}</p>
                                    </div>

                                    <p>{jobs.description.replace(/<[^>]*>/g, '')}</p>
                                </div>
                            )
                            :
                            <div>Loading ...</div>
                    }
                </div>

                <div className="w-[25%] flex flex-col items-center justify-start gap-4">
                    <div className='bg-white  rounded shadow-md  p-4 flex flex-col items-center'>
                        <p className="font-bold text-lg">Email me for jobs</p>
                        <p className="my-2 px-4 text-center">
                            Stay updated! Subscribe to receive the latest job opportunities directly in your inbox.
                        </p>

                        <input
                            id="title"
                            className="border w-full p-2 my-5"
                            placeholder="name@email.com"
                        />
                        <Button
                            variant="contained"
                            className="my-5 py-2 w-full !bg-blue-500 !normal-case"
                        >
                            Subscribe
                        </Button>
                    </div>

                    <div className='bg-white  rounded shadow-md  p-4 flex flex-col items-center'>
                        <p className="font-bold text-lg">Get noticet faster</p>
                        <p className="my-2 px-4 text-center">
                            Stay updated! Subscribe to receive the latest job opportunities directly in your inbox.
                        </p>


                        <Button
                            variant="contained"
                            className="my-5 py-2 w-full !bg-blue-500 !normal-case"

                        >
                            Upload your resume
                        </Button>
                    </div>
                </div>

            </div>


        </div>
    )
}
