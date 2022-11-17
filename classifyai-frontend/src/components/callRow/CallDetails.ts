import {UserDetails} from "../../routes/UserInterface" 
export interface CallDetails {
    id: number,
    cutomer_nbr: string,
    operator_id: number,
    audio_url: string,
    duration: string,
    positive_emotions_pct: number,
    negative_emotions_pct: number,
    neutral_emotions_pct: number,
    script_url: string,
    created_at: string,
    users:UserDetails
}

export interface CallRowProps {
    id: number,
    customerNbr: string,
    duration: string,
    positiveEmotionsPCT: number,
    negativeEmotionsPCT: number,
    neutralEmotionsPCT: number,
    createdAt: string,
    calls: Array<string> | any,
    setCurrentSong: Function | any,
    setIsPlaying: Function | any,
    operator_id: number,
    script_url: string,
    operator:UserDetails
}