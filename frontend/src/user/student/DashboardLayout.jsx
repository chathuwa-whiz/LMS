// combine header, sidebar, navbar and dashboard content
// dashboard contents -> dashboard, courses, schedule, grades, settings
import React from 'react'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  return (
    <div className='flex justify-between lg:p-8 bg-primary1 h-screen'>
        <Navbar />
        <Sidebar />
        <Dashboard />
    </div>
  )
}
