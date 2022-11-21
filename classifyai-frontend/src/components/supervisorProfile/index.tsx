import "./index.scss"
import EmployeeProfileCard from "../employeeProfileCard"
import { SupervisorProfileProps } from "./SupervisorProfileProps"

const SupervisorProfile = ({ supervisor, onClose }: SupervisorProfileProps) => {
    return (
        <div className='overlay'>
            <div className="supervisorprofile">
                <p className='close' onClick={onClose}>X</p>
                <EmployeeProfileCard
                    userProfile={supervisor} />
            </div>
        </div>
    )
}

export default SupervisorProfile