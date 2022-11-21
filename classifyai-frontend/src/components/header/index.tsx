import "./index.scss"
import { useContext, useState } from "react"
import { queryClient } from "../../App"
import { UserDetails } from "../../routes/UserInterface"
import { DarkModeContext } from "../../context/darkModeContext"
import { CgDarkMode } from "react-icons/cg"
import { BASE_URL_PP } from "../../constants/urls"
import SupervisorProfile from "../supervisorProfile"

const Header = () => {
    const { dispatch } = useContext(DarkModeContext)
    const loggedInUser: UserDetails = queryClient.getQueryCache().find(['USER_LOGGED_IN'])?.state.data as UserDetails;
    const loogedInUserProfilePic = loggedInUser?.profile_pic_url;
    const loogedInUserId = loggedInUser?.id;
    const [employeeProfileModal, setEmployeeProfileModal] = useState(false);

    return (
        <div className='header'>
            <div className="header__wrapper">
                <div className="header__toggleBtn">
                    <CgDarkMode
                        className='darkmode__icon'
                        onClick={() => dispatch({ type: "TOGGLE" })}
                    />
                </div>

                {loogedInUserProfilePic &&
                    <img src={`${BASE_URL_PP}/${loogedInUserId}/${loogedInUserProfilePic}`}
                        className="header__pp" alt="pp"
                        onClick={() => setEmployeeProfileModal(true)}
                    />}

            </div>

            {employeeProfileModal &&
                <SupervisorProfile
                    supervisor={loggedInUser}
                    onClose={() => setEmployeeProfileModal(false)} />}
        </div>
    )
}

export default Header

