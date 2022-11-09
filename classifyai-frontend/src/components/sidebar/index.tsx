import React from 'react';
import Logo from "../logo/";
import SidebarLabel from '../sidebarLabel';
import "./index.scss";
import { MdOutlineDashboard } from "react-icons/md";
import { RiFileExcel2Line, RiCustomerService2Line } from "react-icons/ri";
import { MdSupervisorAccount } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { UserDetails } from '../../routes/UserInterface';
import { queryClient } from '../../App';
import { getRoleNameByValue } from '../../helpers/getRoleTitle';


const ROLES = {
    "Super_Supervisor": 1,
    "Supervisor": 2,
    "Operator": 3
}

const Sidebar = () => {
    const loggedInUser: UserDetails = queryClient.getQueryCache().find(['USER_LOGGED_IN'])?.state.data as UserDetails;
    const loogedInUserRole = loggedInUser?.role_id;
    const loogedInUserUsername = loggedInUser?.username;

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <Logo logoType={"sidebar__logo"} />
            </div>
            <p className='sidebar__role'>{getRoleNameByValue(ROLES, loogedInUserRole)}</p>
            <p className="sidebar__username">{loogedInUserUsername ? `@${loogedInUserUsername}` : ""}</p>

            <div className="sidebar__links">

                <SidebarLabel icon={<MdOutlineDashboard size={30} />} labelName='dashboard' />
                {loogedInUserRole === ROLES.Super_Supervisor ? <SidebarLabel icon={<MdSupervisorAccount size={30} />} labelName='supervisors' /> : ""}
                {(loogedInUserRole === ROLES.Super_Supervisor) || (loogedInUserRole === ROLES.Supervisor) ? <SidebarLabel icon={<RiCustomerService2Line size={30} />} labelName='operators' /> : ""}
                {(loogedInUserRole === ROLES.Super_Supervisor) || (loogedInUserRole === ROLES.Supervisor) ? <SidebarLabel icon={<IoCallOutline size={30} />} labelName='calls' /> : ""}
                <SidebarLabel icon={<RiFileExcel2Line size={30} />} labelName='scripts' />

                <div className="sidebar__logout">
                    <SidebarLabel onClick={logout} icon={<FiLogOut size={30} />} labelName='logout' />
                </div>
            </div>
        </div>
    )
}

export default Sidebar