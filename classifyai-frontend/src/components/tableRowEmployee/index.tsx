import React from 'react'
import {useState} from 'react'
import TableRowUserInfo from '../tableRowUserInfo'
import { UserDetails } from "../../routes/UserInterface"
import { AiOutlineEye } from "react-icons/ai"
import { MdOutlineModeEdit } from "react-icons/md"
import { MdDeleteOutline } from "react-icons/md"
import { IconContext } from "react-icons"
import "./index.scss"
import OperatorStatsModal from '../operatorStatsModal'

const TableRow = (user: UserDetails) => {

    const [isOperatorStatsModalActive, setIsOperatorStatsModalActive] = useState(false);
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

                        <AiOutlineEye onClick={()=>{setIsOperatorStatsModalActive(true)}}/>

                        {isOperatorStatsModalActive &&
                        <OperatorStatsModal
                        onClose={()=>{setIsOperatorStatsModalActive(false)}}
                        id={user.id}
                        />}

                        <MdOutlineModeEdit />
                        <MdDeleteOutline />
                    </div>
                </IconContext.Provider>
            </td>
        </tr>
    )
}

export default TableRow