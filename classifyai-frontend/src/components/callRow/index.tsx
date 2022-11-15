import React from 'react'
import "./index.scss"
import { useState } from 'react'
import PhoneIcon from "../../assets/images/phone_green.svg"
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { TbFileDownload } from "react-icons/tb"
import { CallRowProps } from "./CallDetails"
import {BASE_URL_CALLS} from "../../constants/urls"

const CallRow = ({ id, customerNbr, duration, positiveEmotionsPCT, createdAt, calls, setCurrentSong, setIsPlaying,operator_id,script_url }: CallRowProps) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(current => !current);
        setCurrentSong(calls[id - 1]);
        isActive ? setIsPlaying(false) : setIsPlaying(true);
    };

    return (
        <tr key={id}>

            <td className='call__icons'
                style={{
                    backgroundColor: isActive ? 'yellow' : 'white',
                    cursor: 'pointer',
                }}
                onClick={handleClick}>
                <img src={PhoneIcon} alt="phone" className='phone' />


                {isActive ? <FaPauseCircle className='play' />
                    :
                    <FaPlayCircle className='play' />}

            </td>
            <td
                style={{
                    backgroundColor: isActive ? 'yellow' : 'white',
                }}
            >{customerNbr}</td>
            <td className='username'
                style={{
                    backgroundColor: isActive ? 'yellow' : 'white',
                }}
            >@username</td>
            <td
                style={{
                    backgroundColor: isActive ? 'yellow' : 'white',
                }}
            >{createdAt.split("T")[0]}</td>
            <td
                style={{
                    backgroundColor: isActive ? 'yellow' : 'white',
                }}
            >{duration}</td>
            <td className='satisfaction'
                style={{
                    backgroundColor: isActive ? 'yellow' : 'white',
                }}
            >
                <div>
                    <p>{`${positiveEmotionsPCT}%`}</p>
                    <AiOutlineInfoCircle className='info' />
                </div>
            </td >
            <td
                style={{
                    backgroundColor: isActive ? 'yellow' : 'white',
                }}>
                    <a href={`${BASE_URL_CALLS}/${operator_id}/${script_url}`}
                    download>
                    <TbFileDownload className='script' />
                    </a>
                    
                    </td>
        </tr>

    )
}

export default CallRow