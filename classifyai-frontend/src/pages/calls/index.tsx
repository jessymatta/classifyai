import React from 'react'
import { useEffect, useState, useRef } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Table from '../../components/table'
import TitleComponent from '../../components/titleBar'
import DashboardHOC from '../../hoc/DashboardHOC'
import { useGetAllCalls } from "../../query/calls/useCalls"
import Pagination from '../../components/pagination'
import AudioController from '../../components/audioController'
import { CurrentCall } from "./CurrentCall"
import Config from "../../constants/config.json"
import AddInfoModalHOC from '../../hoc/addInfoModalHOC'
import UploadCallModal from '../../components/uploadCallModal'

const Calls = () => {
    const { data: allCalls, isSuccess: allCallsSuccess } = useGetAllCalls()
    const [allCallsData, setAllCallsData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [callsPerPage] = useState(8)
    const indexOfLastCall = currentPage * callsPerPage;
    const indexOfFirstCall = indexOfLastCall - callsPerPage;
    const currentCalls = allCallsData.slice(indexOfFirstCall, indexOfLastCall)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const [calls, setCalls] = useState(allCallsData)
    const [isPlaying, setIsplaying] = useState(false)

    const [currentCall, setCurrentCall] = useState<CurrentCall>(allCallsData[0])
    const [url, setUrl] = useState<string>()
    const audioElem = useRef<HTMLAudioElement>(null)

    const [openUploadCallModal, setOpenUploadCallModal] = useState(false)

    useEffect(() => {
        if (allCallsSuccess) {
            setAllCallsData(allCalls.data)
            setCurrentCall(allCalls.data[0])
            setCalls(allCalls.data)
        }
    }, [allCalls])

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
            setUrl(`${Config.BASE_URL_CALLS}/${currentCall.operator_id}/${currentCall.audio_url}`)
        }
    }, [currentCall])

    return (
        <DashboardHOC>
            <Sidebar />
            <Header />
            <div>
                <TitleComponent title={"Calls"} btnText={"add call"}
                    onClick={() => setOpenUploadCallModal(true)} />

                <Table
                    headers={["Play", "Customer's number", "Operator username", "Created At", "Duration", "Customer satisfaction", "Script"]}
                    callData={currentCalls}
                    calls={calls}
                    setCurrentSong={setCurrentCall}
                    setIsPlaying={setIsplaying}
                />

                <Pagination
                    usersPerPage={callsPerPage}
                    totalUsers={allCallsData.length}
                    paginate={paginate}
                />

                {url && <audio
                    src={url}
                    ref={audioElem}
                    onTimeUpdate={onPlaying} />}

                <AudioController calls={calls} isPlaying={isPlaying}
                    setIsplaying={setIsplaying} audioElem={audioElem}
                    currentCall={currentCall}
                    setCurrentCall={setCurrentCall}
                />

                <AddInfoModalHOC
                    open={openUploadCallModal}
                    onClose={() => setOpenUploadCallModal(false)}
                    modalTitle={"Add Call"}
                    width="50vw" >
                    <UploadCallModal onClose={() => setOpenUploadCallModal(false)}  />
                </AddInfoModalHOC>
            </div>
            <Footer />
        </DashboardHOC>
    )
}

export default Calls