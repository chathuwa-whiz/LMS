import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './user/Login';
import Register from './user/Register';

// student routes
import DashboardLayout from './user/student/DashboardLayout';
import Course from './user/student/Course';
import Dashboard from './user/student/Dashboard';
import Schedule from './user/student/Schedule';
import Grade from './user/student/Grade';
import Settings from './user/student/Settings';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* check authentication */}
          <Route path='/' element={<Layout />}>

            {/* student routes */}
            <Route path='/' element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='courses' element={<Course />} />
              <Route path='schedule' element={<Schedule />} />
              <Route path='grades' element={<Grade />} />
              <Route path='settings' element={<Settings />} />
            </Route>

            {/* teacher routes */}
          </Route>

          {/* other user routes which don't require user authentication */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}