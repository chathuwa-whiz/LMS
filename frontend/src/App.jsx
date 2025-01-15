import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './layout/layout';
import Dashboard from './user/dashboard';
import Login from './user/login';
import Register from './user/register';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />

          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}