export interface AudioControllerProps {
    calls: Array<string>;
    isPlaying: boolean;
    setIsplaying: Function;
    audioElem: any;
    currentCall: any;
    setCurrentCall: Function;
}