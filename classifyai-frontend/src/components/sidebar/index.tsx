import React from 'react';
import "./index.scss";
import Logo from "../logo/";
import SidebarLabel from '../sidebarLabel';
import { FiLogOut } from "react-icons/fi";
import { UserDetails } from '../../routes/UserInterface';
import { queryClient } from '../../App';
import { getRoleNameByValue } from '../../helpers/getRoleTitle';
import { sidesbarLabels } from "../../constants/sidebarEnum"
import { ROLES } from "../../constants/roles"

const Sidebar = () => {
    const loggedInUser: UserDetails = queryClient.getQueryCache().find(['USER_LOGGED_IN'])?.state.data as UserDetails;
    const loggedInUserRole = loggedInUser?.role_id;
    const loggedInUserUsername = loggedInUser?.username;

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <Logo logoType={"sidebar__logo"} />
            </div>
            <p className='sidebar__role'>{getRoleNameByValue(ROLES, loggedInUserRole)}</p>
            <p className="sidebar__username">{loggedInUserUsername ? `@${loggedInUserUsername}` : ""}</p>

            <div className="sidebar__links">

                {sidesbarLabels[loggedInUserRole].map((label) => (
                    <SidebarLabel linkTo={label.linkTo} icon={label.icon} labelName={label.labelName} />
                ))}

                <div className="sidebar__logout">
                    <SidebarLabel onClick={logout} icon={<FiLogOut size={30} />} labelName='logout' />
                </div>
            </div>
        </div>
    )
}

export default Sidebar