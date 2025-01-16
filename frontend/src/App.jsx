import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Dashboard from './user/Dashboard';
import Login from './user/Login';
import Register from './user/Register';

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