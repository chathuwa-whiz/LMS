import React, { useState } from 'react'
import { FaRegBell, FaBars } from "react-icons/fa6"
import { FiHome, FiBriefcase, FiCalendar, FiBarChart2, FiSettings } from 'react-icons/fi'
import { IoSearchOutline, IoCloseSharp } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {

    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

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
        <section>

            {/* Desktop view */}
            <div className='hidden lg:flex justify-between w-full h-full'>
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
            </div>

            {/* Mobile view */}
            <div className='lg:hidden flex justify-between items-center w-full h-full pt-4'>
                {/* Title */}
                <span className='text-primary4 text-2xl font-bold'>{title()}</span>

                <div className='flex gap-x-4'>
                    {/* notification */}
                    <div className="flex items-center justify-center p-3 rounded-full bg-white hover:bg-primary2 cursor-pointer">
                        <FaRegBell />
                    </div>
                    {/* Menu Toggle */}
                    <div
                        className="flex items-center justify-center p-3 rounded-full bg-white hover:bg-primary2 cursor-pointer"
                        onClick={toggleNav}
                    >
                        {isNavOpen ? <IoCloseSharp /> : <FaBars />}
                    </div>
                </div>

            </div>

            {/* Mobile Navigation Bar */}
            {isNavOpen && (
                <div className='absolute w-auto bg-white left-0 right-0 mt-2 mx-3 rounded-lg p-4 flex flex-col gap-3 z-50'>
                    <div
                        onClick={() => navigate('/')}
                        className={`flex items-center hover:cursor-pointer pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiHome size={20} />
                        <span className='ml-3'>Dashboard</span>
                    </div>

                    <div
                        onClick={() => navigate('/courses')}
                        className={`flex items-center hover:cursor-pointer pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/courses' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiBriefcase size={20} />
                        <span className='ml-3'>Courses</span>
                    </div>

                    <div
                        onClick={() => navigate('/schedule')}
                        className={`flex items-center hover:cursor-pointer pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/schedule' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiCalendar size={20} />
                        <span className='ml-3'>Schedule</span>
                    </div>

                    <div
                        onClick={() => navigate('/grades')}
                        className={`flex items-center hover:cursor-pointer pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/grades' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiBarChart2 size={20} />
                        <span className='ml-3'>Grades</span>
                    </div>

                    <div
                        onClick={() => navigate('/settings')}
                        className={`flex items-center hover:cursor-pointer pl-3 pr-14 py-3 rounded-xl text-gray-700 ${currentPath === '/settings' ? 'bg-primary2 font-semibold' : 'hover:bg-primary2'}`}>
                        <FiSettings size={20} />
                        <span className='ml-3'>Settings</span>
                    </div>
                </div>
            )}

        </section>
    )
}
