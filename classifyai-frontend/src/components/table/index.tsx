import React from 'react'
import "./index.scss"
import { UserDetails } from '../../routes/UserInterface'
import TableRow from '../tableRowEmployee'
import { TableProps } from "./TableProps"
import CallRow from '../callRow'
import { CallDetails } from "../../components/callRow/CallDetails"

const Table = ({ headers, rowsData, callData, calls, setCurrentSong,setIsPlaying }: TableProps) => {

    return (
        <div className='table'>
            <table>
                <thead>
                    <tr>

                        {headers.map((th) => (
                            <th>{th}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {callData ?
                        <>
                            {callData.map((call: CallDetails) => (
                                <CallRow
                                    id={call.id}
                                    customerNbr={call.cutomer_nbr}
                                    duration={call.duration}
                                    positiveEmotionsPCT={call.positive_emotions_pct}
                                    createdAt={call.created_at}
                                    calls={calls}
                                    setCurrentSong={setCurrentSong}
                                    setIsPlaying={setIsPlaying}
                                />
                            ))}
                        </>

                        :

                        rowsData?.map((operator: UserDetails) => (
                            <TableRow {...operator} />
                        ))}

                </tbody>
            </table>
        </div>
    )
}

export default Table