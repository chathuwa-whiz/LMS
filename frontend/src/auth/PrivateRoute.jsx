import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {

    // check if the user is authenticated
    const isAuthenticated = !!localStorage.getItem('token');

    return isAuthenticated ? children : <Navigate to={'/login'} />;

}
