import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { queryClient } from '../App';
import { UserDetails } from './UserInterface'

interface RolesProp {
    allowedRoles: number[]
}

const RequireAuth = ({ allowedRoles }: RolesProp) => {
    const location = useLocation();
    const jwt = localStorage.getItem('jwt');
    const loggedInUser: UserDetails = queryClient.getQueryCache().find(['USER_LOGGED_IN'])?.state.data as UserDetails;
    const role = loggedInUser?.role_id;
    const isAuthorized = allowedRoles.includes(role);

    return (

        isAuthorized
            ? <Outlet />
            : jwt ?
                <Navigate to="/unauthorized" state={{ from: location }} replace /> 
                : <Navigate to="/redirect" /> 

    )
}

export default RequireAuth