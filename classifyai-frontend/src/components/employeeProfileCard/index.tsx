import "./index.scss";
import Config from "../../constants/config.json";
import DummyPP from "../../assets/images/dummy__pp.svg";
import { EmployeeProfileCardProps } from "./EmployeeProfileCardProps";
import { EmployeeProfileCardLabels } from "../../helpers/employeeProfileCardHelpers";

const EmployeeProfileCard = ({ userProfile }: EmployeeProfileCardProps) => {
    const ToDisplay = EmployeeProfileCardLabels(userProfile)
    return (
        <div className='employeeProfile'>

            <p className='employeeProfile__title'>Details</p>
            <hr />

            {userProfile.profile_pic_url ?
                <img src={`${Config.BASE_URL_PP}/${userProfile.id}/${userProfile.profile_pic_url}`} alt="pp" />
                :
                <img src={DummyPP} alt="pp" />
            }

            <div className="employeeProfile__info">
                {ToDisplay.map((tag) => (
                    <>
                        <p className='employeeProfile__info--label'>{tag.label}</p>
                        <p className='employeeProfile__info--data'>{tag.value}</p>
                    </>
                ))}

            </div>
        </div>
    )
}

export default EmployeeProfileCard