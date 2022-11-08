import React from 'react'
import Logo from "../logo/";
import SidebarLabel from '../sidebarLabel';
import "./index.scss"
import { SidebarProps } from './sidebar';
import { MdOutlineDashboard } from "react-icons/md";
import { RiFileExcel2Line, RiCustomerService2Line } from "react-icons/ri";
import { MdSupervisorAccount } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({role, username}:SidebarProps) => {
    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <Logo logoType={"sidebar__logo"} />
            </div>
                <p className='sidebar__role'>{role}</p>
                <p className="sidebar__username">{username? `@${username}`: ""}</p>

            <div className="sidebar__links">
                {/* //TODO: add links  */}
                <SidebarLabel icon={<MdOutlineDashboard size={30}/>} labelName='dashboard'/>
                <SidebarLabel icon={<MdSupervisorAccount size={30}/>} labelName='supervisors'/>
                <SidebarLabel icon={<RiCustomerService2Line size={30}/>} labelName='operators'/>
                <SidebarLabel icon={<IoCallOutline size={30}/>} labelName='calls'/>
                <SidebarLabel icon={<RiFileExcel2Line size={30}/>} labelName='scripts'/>

                <div className="sidebar__logout">
                <SidebarLabel onClick={logout} icon={<FiLogOut size={30}/>} labelName='logout'/>
                </div>
                
            </div>

        </div>
    )
}

export default Sidebar