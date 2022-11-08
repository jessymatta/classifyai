import React from 'react'
import Logo from "../logo/";
import "./index.scss"
import { SidebarProps } from './sidebar';

const Sidebar = ({role, username}:SidebarProps) => {
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <Logo logoType={"sidebar__logo"} />
            </div>
                <p className='sidebar__role'>{role}</p>
                <p className="sidebar__username">{username? `@${username}`: ""}</p>

            <div className="links">
                
            </div>

            <div className="bottom">
                
            </div>
        </div>
    )
}

export default Sidebar