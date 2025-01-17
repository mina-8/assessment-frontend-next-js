import React from 'react'
// import Form from 'next/form'
import JobForm from '@/components/JobForm'
export default function page() {
    return (
        <div className='m-4 py-4 px-12 '>
            <h3 className='font-bold text-2xl'>Post a job</h3>
            
            <JobForm/>
        </div>
    )
}
