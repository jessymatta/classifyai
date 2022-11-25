import { Sentiments } from "../../components/operatorProfileTabs/operatorProfileTabsProps";
import { UserDetails } from "../../routes/UserInterface";

export interface OperatorStatsResponse {
    operator_profile: UserDetails,
    operator_monthly_sentiment_analysis: Sentiments,
    operator_monthly_total_calls_duration: number,
    operator_calls_count: number,
    operator_last7_days_analysis: Array<any>,
    operator_calls_info: Array<string>
}