export interface ScriptUploadDataModalProps {
    customerPcts: number[],
    operatorPcts: number[],
    customerConfidenceAvg: number,
    operatorConfidenceAvg: number,
    customerTotalSentencesNbr: number,
    operatorTotalSentencesNbr: number,
    onClick: () => void
}