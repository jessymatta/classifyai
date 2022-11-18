import { useState, useEffect, useRef } from 'react'
import Table from "../table"
import Pagination from '../../components/pagination'
import AudioController from '../../components/audioController'
import { CurrentCall } from "../../pages/calls/CurrentCall"
import { BASE_URL_CALLS } from "../../constants/urls"

interface SingleOperatorCallsProps {
    calls: Array<string> 
}

const SingleOperatorCalls = ({ calls }: SingleOperatorCallsProps) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [callsPerPage] = useState(8)
    const indexOfLastCall = currentPage * callsPerPage;
    const indexOfFirstCall = indexOfLastCall - callsPerPage;
    const currentCalls = calls.slice(indexOfFirstCall, indexOfLastCall)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const [isPlaying, setIsplaying] = useState(false)

    const [currentCall, setCurrentCall] = useState<CurrentCall>(calls[0])
    const [url, setUrl] = useState<string>()
    const audioElem = useRef<HTMLAudioElement>(null)

    const onPlaying = () => {
        const duration = audioElem.current?.duration;
        const currentTime = audioElem.current?.currentTime;
        if (currentTime && duration) {
            const progress = (currentTime / duration) * 100;
            setCurrentCall({ ...currentCall, "progress": progress, "length": duration })
        }
    }

    useEffect(() => {
        if (isPlaying && audioElem.current) {
            audioElem.current.play()
        }
        else {
            audioElem.current?.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        if (currentCall) {
            setUrl(`${BASE_URL_CALLS}/${currentCall.operator_id}/${currentCall.audio_url}`)
        }
    }, [currentCall])

    useEffect(() => {
        setCurrentCall(calls[0])
        setUrl(`${BASE_URL_CALLS}/${currentCall.operator_id}/${currentCall.audio_url}`)
    }, [calls])
    return (
        <>
            <Table
                headers={["Play", "Customer's number", "Created At", "Duration", "Customer satisfaction", "Script"]}
                callData={currentCalls}
                calls={calls}
                setCurrentSong={setCurrentCall}
                setIsPlaying={setIsplaying}
                singleOperator={true}
            />

            <Pagination
                usersPerPage={callsPerPage}
                totalUsers={calls.length}
                paginate={paginate}
            />

            {url && <audio
                src={url}
                ref={audioElem}
                onTimeUpdate={onPlaying} />}

            {url && <AudioController calls={calls} isPlaying={isPlaying}
                setIsplaying={setIsplaying} audioElem={audioElem}
                currentCall={currentCall}
                setCurrentCall={setCurrentCall}
            />}
        </>
    )
}

export default SingleOperatorCalls