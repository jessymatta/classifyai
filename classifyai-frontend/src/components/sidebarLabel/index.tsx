import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import {SidebarLabelProps} from './sidebarLabelProps'

const SidebarLabel = ({ icon, labelName, linkTo, onClick }: SidebarLabelProps) => {

    return (
        <div className='sidebar__label--container'>
            <Link onClick={onClick} className="sidebar__link" to={linkTo? `/${linkTo}?`: ""}>
                <div className="sidebar__icon">{icon}</div>
                <p className='sidebar__label'>{labelName.toUpperCase()}</p>
            </Link>
        </div>
    )
}

export default SidebarLabel