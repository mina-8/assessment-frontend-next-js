
import React from 'react'

import Link from 'next/link'

export default function Navbar() {
    
  return (
    <nav>
        <div className="w-full h-20  top-0 px-5">
        <div className=" mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            
            <div className='font-bold text-blue-500 text-2xl'>Joboard</div>
            <ul className="hidden md:flex gap-x-6 ">
              <li>
                <Link href="/about">
                  <p>start a search</p>
                </Link>
              </li>
              <li>
                <Link href="JobList">
                  <p>Jobs list</p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p>Salary estimate</p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p>Pricing</p>
                </Link>
              </li>
            </ul>
            <div className='flex justify-between items-center w-[20%]'>
            <Link href="Addjob"  className='bg-green-500  p-2 rounded-lg text-white' >New job</Link>
            
            <Link href="/"  className='border  p-2 rounded-lg' >Log in</Link>
            <Link href="/"  className='bg-blue-600  p-2 rounded-lg text-white' >Sign up</Link>
            </div>
            
          </div>
        </div>
      </div>

    </nav>
  )
}
