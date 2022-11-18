import { UserDetails } from "../../routes/UserInterface"
import { Sentiments } from "../operatorProfileTabs/operatorProfileTabsProps"

export interface OperatorStatsModalProps {
    onClose: () => void,
    id: number
}

export interface OperatorStatsResponse {
    operator_profile: UserDetails,
    operator_calls_count: number,
    operator_monthly_total_calls_duration: number
    operator_monthly_sentiment_analysis: Sentiments
    operator_calls_info:Array<string>
}