import "./index.scss";
import { useState } from "react";
import TableRowUserInfo from "../tableRowUserInfo";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import OperatorStatsModal from "../operatorStatsModal";
import SupervisorProfile from "../supervisorProfile";
import ConfirmationPopup from "../confirmation";
import EditProfileModal from "../editProfile";
import AddInfoModalHOC from "../../hoc/addInfoModalHOC";
import { TableRowProps } from "./TableRowProps";

const TableRow = ({ user, supervisor, supersupervisor }: TableRowProps) => {
    const [isOperatorStatsModalActive, setIsOperatorStatsModalActive] = useState(false);
    const [isSupervisorModalActive, setIsSupervisorModalActive] = useState(false);
    const [deleteEmployeeConfirmation, setDeleteEmployeeConfirmation] = useState(false);
    const [isEditProfileModalActive, setEditProfileModalActive] = useState(false);

    const openOperatorStatsModal = () => setIsOperatorStatsModalActive(true);
    const openSupervisorProfileModal = () => setIsSupervisorModalActive(true);
    return (
        <tr key={user.id}>
            <td><TableRowUserInfo id={user.id} ppPath={user.profile_pic_url} firstName={user.first_name} lastName={user.last_name} username={user.username} /></td>
            <td>{user.email}</td>
            <td>{user.created_at.split("T")[0]}</td>
            <td>
                <IconContext.Provider
                    value={{ color: '#949494', size: '20px' }}
                >

                    <div className="table__icons">

                        <AiOutlineEye
                            onClick={supervisor ? openSupervisorProfileModal : openOperatorStatsModal}
                        />

                        {isOperatorStatsModalActive &&
                            <OperatorStatsModal
                                onClose={() => { setIsOperatorStatsModalActive(false) }}
                                id={user.id}
                            />}

                        {isSupervisorModalActive && <SupervisorProfile
                            supervisor={user}
                            onClose={() => setIsSupervisorModalActive(false)} />}

                        {supersupervisor && <MdOutlineModeEdit
                            onClick={() => setEditProfileModalActive(true)} />}

                        {supersupervisor && <MdDeleteOutline
                            onClick={() => setDeleteEmployeeConfirmation(true)} />}

                        {deleteEmployeeConfirmation &&
                            <ConfirmationPopup
                                onClose={() => setDeleteEmployeeConfirmation(false)}
                                id={user.id} />}
                        {isEditProfileModalActive &&
                            <>
                                <AddInfoModalHOC
                                    open={isEditProfileModalActive}
                                    onClose={() => setEditProfileModalActive(false)}
                                    modalTitle={"Edit Profile"} >
                                    <EditProfileModal
                                        employee={user}
                                        onClose={() => setEditProfileModalActive(false)} />
                                </AddInfoModalHOC>
                            </>
                        }
                    </div>
                </IconContext.Provider>
            </td>
        </tr>
    )
}

export default TableRow;