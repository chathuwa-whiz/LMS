// left side bar for navigation items
// in mobile view this is shown as a toggle navigation bar
import React from 'react'
import LazyLoad from 'react-lazy-load'
import { FiHome, FiBriefcase, FiCalendar, FiBarChart2, FiSettings } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

export default function Navbar() {

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <section>
            {/* desktop view */}
            <div className='flex flex-col'>
                {/* logo */}
                <LazyLoad className='w-20'>
                    <img src='/icons/logo-2.png' />
                </LazyLoad>

                {/* navigation links */}
                <div className='mt-10 flex flex-col gap-y-3'>
                    <a href='/' className={`flex items-center pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiHome size={20} />
                        <span className='ml-3'>Dashboard</span>
                    </a>

                    <a href='/courses' className={`flex items-center pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/courses' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiBriefcase size={20} />
                        <span className='ml-3'>Courses</span>
                    </a>

                    <a href='/schedule' className={`flex items-center pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/schedule' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiCalendar size={20} />
                        <span className='ml-3'>Schedule</span>
                    </a>

                    <a href='/grades' className={`flex items-center pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/grades' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiBarChart2 size={20} />
                        <span className='ml-3'>Grades</span>
                    </a>

                    <a href='/settings' className={`flex items-center pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/settings' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiSettings size={20} />
                        <span className='ml-3'>Settings</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
