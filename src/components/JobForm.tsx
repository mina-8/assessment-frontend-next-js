"use client";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";


const JobForm = () => {
    const quillRef = useRef<HTMLDivElement | null>(null);
    const [quillInstance, setQuillInstance] = useState<Quill | null>(null);



    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['link'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ];

    useEffect(() => {
        if (quillRef.current) {
            const quill = new Quill(quillRef.current, {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: "snow",
                placeholder: "Add your job description",
            });
            setQuillInstance(quill);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const title = (document.getElementById('title') as HTMLInputElement)?.value;
        const salary = (document.getElementById('salary') as HTMLInputElement)?.value;
        const type = (document.getElementById('jobType') as HTMLSelectElement)?.value;
        const location = (document.getElementById('location') as HTMLInputElement)?.value;
        const description = quillInstance ? quillInstance.root.innerHTML : "";


        if (!title || !salary || !type || !description) {
            alert("Please fill out all fields.");
            return;
        }

        if (isNaN(Number(salary)) || parseInt(salary) !== Number(salary)) {
            alert("Please enter a valid integer for salary.");
            return;
        }

        const inputForm = {
            title,
            description,
            location,
            salary,
            type,
        };

        try {
            // Fetch CSRF token from API
            const csrfResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/csrf-token`, {
                method: 'GET',
                credentials: 'include',
            });
            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrfToken;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(inputForm),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const errorData = await response.json();
                console.log(errorData);
                alert("Error: " + errorData.message);
            }
        } catch (error: unknown) {
            console.error(error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <form className="flex flex-col items-start my-5" onSubmit={handleSubmit}>
            <div className="mb-4 w-full">
                <label htmlFor="title" className="block mb-1">Job Title</label>
                <input
                    id="title"
                    className="border w-full p-2"
                    placeholder="Add job title, role, vacancies, etc."
                />
            </div>

            <div className="mb-4 w-full">
                <label htmlFor="description" className="block mb-1">Job Description</label>
                <div
                    id="description"
                    ref={quillRef}
                    className="border w-full p-2"
                    style={{ minHeight: "150px" }}
                />
            </div>

            <div className="mb-4 w-full">
                <label htmlFor="salary" className="block mb-1">Salary</label>
                <div className="relative w-1/3">
                    <input
                        id="salary"
                        type="number"
                        
                        className="border w-full p-2 pr-10"
                        placeholder="Minimum salary..."
                        style={{ paddingRight: "50px" }}
                    />
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center p-2 bg-gray-500 h-full text-white rounded-e-lg">
                        USD
                    </span>
                </div>
            </div>

            <div className="mb-4 w-full">
                <label htmlFor="jobType" className="block mb-1">Job Type</label>
                <select
                    id="jobType"
                    className="border w-1/3 p-2 bg-white rounded"
                >
                    <option value="">Select...</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="temporary">Temporary</option>
                </select>
            </div>

            <div className="mb-4 w-full">
                <label htmlFor="location" className="block mb-1">location</label>
                <div className="w-1/3">

                    <input
                        id="location"
                        className="border w-full p-2 w-full"
                        placeholder="Add job location"
                    />
                </div>
            </div>


            <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">
                Post Job
            </button>
        </form>
    );
};

export default JobForm;
