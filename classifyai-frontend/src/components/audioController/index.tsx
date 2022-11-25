import React, { useRef } from "react";
import "./index.scss";
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsFillSkipEndCircleFill } from 'react-icons/bs';
import { AudioControllerProps } from "./AudioControllerProps";
import { formatTime } from "../../helpers/formatTime";

const AudioController = ({ calls,
    isPlaying,
    setIsplaying,
    audioElem,
    currentCall,
    setCurrentCall }: AudioControllerProps) => {
    const PlayPause = () => {
        setIsplaying(!isPlaying);
    }

    const clickRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const checkWidth = (e: any) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width * 100;
        audioElem.current.currentTime = (divprogress / 100 * currentCall.length).toString();
    }

    const skipBack = () => {
        const currId = (element: any) => element.id === currentCall.id;
        const index = calls.findIndex(currId)
        if (index === 0) {
            setCurrentCall(calls[calls.length - 1]);
        } else {
            setCurrentCall(calls[index - 1]);
        }
        audioElem.current.currentTime = 0;
    }

    const skipToNext = () => {
        const currId = (element: any) => element.id === currentCall.id;
        const index = calls.findIndex(currId);
        if (index === calls.length - 1) {
            setCurrentCall(calls[0]);
        } else {
            setCurrentCall(calls[index + 1]);
        }
        audioElem.current.currentTime = 0;
    }

    return (
        <div className='player_container'>
            <div className="title">
                <p>{currentCall ? currentCall.id : "no"}</p>
            </div>
            <div className="controls">
                <BsFillSkipStartCircleFill className='btn_action' onClick={skipBack} />

                {isPlaying ?
                    <BsFillPauseCircleFill className='btn_action bigger' onClick={PlayPause} />
                    :
                    <BsFillPlayCircleFill className='btn_action bigger' onClick={PlayPause} />}
                <BsFillSkipEndCircleFill className='btn_action' onClick={skipToNext} />
            </div>
            <div className="navigation">
                <div className='timestamps'>

                    {audioElem.current?.currentTime ? <p>{formatTime(audioElem.current.currentTime)}</p>
                        :
                        <p>0:00</p>}

                    {currentCall && <p>{currentCall.duration}</p>}
                </div>
                <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef} >
                    {currentCall && <div className="seek_bar" style={{ width: `${currentCall.progress + "%"}` }}></div>}
                    <div className="seek_bar"></div>
                </div>
            </div>
        </div>
    )
}

export default AudioController;