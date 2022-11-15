export interface CurrentCall {
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
    progress: any,
    length: any
}