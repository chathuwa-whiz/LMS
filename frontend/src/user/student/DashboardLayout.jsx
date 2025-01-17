// combine header, sidebar, navbar and dashboard content
// outlet contents -> dashboard, courses, schedule, grades, settings
import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className='flex lg:p-8'>
        <Navbar />
        <Outlet />
        <Sidebar />
    </div>
  )
}
