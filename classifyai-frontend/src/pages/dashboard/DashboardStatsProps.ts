export interface DashboardStats {
    total_operators_number: number,
    total_calls_duration_this_month: string
    daily_sentiment_analysis_avg: any,
    last_7_days_analysis_avg: object,
    best_worst_operator: BestWorstOperator,
}

export interface BestWorstOperator {
    best_operator: { average_positive_pct: number, operator: OperatorProfile },
    worst_operator: { average_negative_pct: number, operator: OperatorProfile }
}

export interface OperatorProfile {
    first_name: string,
    last_name: string,
    username: string,
}