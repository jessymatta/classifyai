export interface DataToDisplay {
    customer_confidence: number;
    customer_sentences_number: number;
    operator_confidence: number;
    operator_sentences_number: number;
    customer_sentiments_avg: SentimentsObject;
    operator_sentiments_avg: SentimentsObject;
}

export interface SentimentsObject {
    POSITIVE: number;
    NEGATIVE: number;
    NEUTRAL: number;
}