// main dashboard
import React from 'react'
import Header from './Header'
import LazyLoad from 'react-lazy-load'
import { FaChevronRight } from "react-icons/fa6";

const courses = [
    {
        title: 'Information Technology',
        modules: '20 modules',
        image: '/images/register_bg.png',
    },
    {
        title: 'Information Technology',
        modules: '20 modules',
        image: '/images/register_bg.png',
    },
    {
        title: 'Information Technology',
        modules: '20 modules',
        image: '/images/register_bg.png',
    },
    {
        title: 'Information Technology',
        modules: '20 modules',
        image: '/images/register_bg.png',
    },
    {
        title: 'Information Technology',
        modules: '20 modules',
        image: '/images/register_bg.png',
    },
]

const modules = [
    {
        title: 'Web design',
        lessons: '10 lessons',
        start: 'January 27',
        progress: '80%',
    },
    {
        title: 'Web design',
        lessons: '10 lessons',
        start: 'January 27',
        progress: '80%',
    },
    {
        title: 'Web design',
        lessons: '10 lessons',
        start: 'January 27',
        progress: '80%',
    },
    {
        title: 'Web design',
        lessons: '10 lessons',
        start: 'January 27',
        progress: '80%',
    },
    {
        title: 'Web design',
        lessons: '10 lessons',
        start: 'January 27',
        progress: '80%',
    },
]

export default function Dashboard() {
    return (
        <section className='w-4/6 px-10'>
            <Header />

            {/* courses */}
            <div className='mt-10'>
                {/* title */}
                <span className='text-2xl font-semibold text-primary4'>Courses</span>

                {/* course card */}
                <div className='flex gap-x-4 mt-6 overflow-x-auto whitespace-nowrap scrollbar-hide'>
                    {courses.map((course, index) => (
                        <div key={index} className='bg-primary2 w-52 h-60 rounded-xl p-2 overflow-hidden flex flex-col justify-between flex-shrink-0'>
                            <div className='h-1/2 w-full rounded-lg flex justify-center items-center bg-primary3'>
                                <LazyLoad className='w-24'>
                                    <img src={course.image} />
                                </LazyLoad>
                            </div>

                            <div>
                                <p className='text-sm font-semibold text-gray-700 mt-2'>{course.title}</p>
                                <p className='text-gray-700 text-xs mt-1'>{course.modules}</p>
                            </div>

                            {/* card bottom */}
                            <div className='flex justify-between mt-3'>
                                {/* 3 lecture photos */}
                                <div className='relative flex items-end'>
                                    <div className='w-8 h-8 bg-purple-400 rounded-full hover:scale-110 hover:-translate-y-2 transition-transform'></div>
                                    <div className='w-8 h-8 bg-purple-500 rounded-full hover:scale-110 hover:-translate-y-2 transition-transform absolute left-6'></div>
                                    <div className='w-8 h-8 bg-purple-600 rounded-full hover:scale-110 hover:-translate-y-2 transition-transform absolute left-12'></div>
                                </div>

                                {/* go to course page */}
                                <div className='flex items-center justify-center h-10 w-10 bg-primary3 rounded-lg text-primary1 hover:cursor-pointer hover:scale-110 transition-transform'>
                                    <FaChevronRight />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* my modules */}
            <div className='mt-10'>
                {/* title */}
                <div className='flex justify-between items-center'>
                    <span className='text-2xl font-semibold text-primary4'>My Modules</span>
                    <span className='text-primary3 text-sm hover:cursor-pointer'>View All</span>
                </div>

                {/* module table */}
                <table className='w-full mt-6'>
                    <tr className='text-gray-500 text-sm'>
                        <td>Module Name</td>
                        <td>Start</td>
                        <td>Progress</td>
                    </tr>
                    {modules.map((module, index) => (
                        <tr key={index}>
                            <td className='flex items-start gap-x-2 mt-4'>
                                <div className='w-10 h-10 bg-primary2 rounded-lg'></div>
                                <div>
                                    <p className='font-semibold text-gray-800'>{module.title}</p>
                                    <p className='text-xs text-gray-600'>{module.lessons}</p>
                                </div>
                            </td>
                            <td>
                                <p className='font-semibold text-gray-800'>{module.start}</p>
                            </td>
                            <td>
                                <p className='font-semibold text-gray-800'>{module.progress}</p>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </section>
    )
}
