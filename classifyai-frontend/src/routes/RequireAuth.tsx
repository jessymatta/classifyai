import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { queryClient } from '../App';
import { UserDetails } from './UserInterface'

interface RolesProp {
    allowedRoles: number[]
}

const RequireAuth = ({ allowedRoles }: RolesProp) => {
    const jwt = localStorage.getItem('jwt');
    const loggedInUser: UserDetails = queryClient.getQueryCache().find(['USER_LOGGED_IN'])?.state.data as UserDetails;
    const role = loggedInUser?.role_id;
    const isAuthorized = allowedRoles.includes(role);

    return (

        isAuthorized
            ? <Outlet />
            : jwt ?
                <Navigate to="/" />
                : <Navigate to="/" />

    )
}

export default RequireAuth