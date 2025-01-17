import React from 'react'
import { FaRegBell } from "react-icons/fa6"
import { IoSearchOutline } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'

export default function Header() {

    const location = useLocation();
    const currentPath = location.pathname;

    const title = () => {
        switch (currentPath) {
            case '/':
                return 'Dashboard';
            case '/courses':
                return 'Courses';
            case '/schedule':
                return 'Schedule';
            case '/grades':
                return 'Grades';
            case '/settings':
                return 'Settings';
            default:
                return 'Dashboard';
        }
    }

    return (
        <section className='flex justify-between'>
            
            {/* title */}
            <span className='text-primary4 text-3xl font-bold'>{title()}</span>

            {/* search bar and notification */}
            <div className='w-1/2 flex gap-x-4 justify-end'>
                <div className='flex items-center gap-x-4 px-4 text-gray-500 text-lg h-full w-full bg-white rounded-lg'>
                    <IoSearchOutline />
                    <input type='text' placeholder='Search' className='w-full focus:outline-none' />
                </div>
                <div className="flex items-center justify-center p-3 rounded-md bg-white hover:bg-primary2 cursor-pointer">
                    <FaRegBell />
                </div>
            </div>

        </section>
    )
}
