import React from 'react';
import "./index.scss";
import { queryClient } from '../../App';
import { UserDetails } from '../../routes/UserInterface';
import {MdOutlineLightMode} from "react-icons/md";
import {CiDark} from "react-icons/ci";

const Header = () => {
    const loggedInUser: UserDetails = queryClient.getQueryCache().find(['USER_LOGGED_IN'])?.state.data as UserDetails;
    const loogedInUserProfilePic = loggedInUser?.profile_pic_url;
    const loogedInUserId = loggedInUser?.id;
    return (
        <div className='header'>
            <div className="header__wrapper">
                <div className="header__toggleBtn"><CiDark/><MdOutlineLightMode /></div>
                {loogedInUserProfilePic ? <img src={`http://127.0.0.1:8000/images/profile_pictures/${loogedInUserId}/${loogedInUserProfilePic}`} className="header__pp" alt="pp" /> : ""}
            </div>
        </div>
    )
}

export default Header