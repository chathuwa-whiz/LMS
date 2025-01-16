import React from 'react'
import { Outlet } from 'react-router-dom'
import PrivateRoute from '../auth/PrivateRoute'

export default function Layout() {
  return (
    <PrivateRoute>
        <Outlet />
    </PrivateRoute>
  )
}
