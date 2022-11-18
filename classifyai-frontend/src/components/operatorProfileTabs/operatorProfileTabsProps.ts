import { UserDetails } from "../../routes/UserInterface";

export interface OperatorProfileTabsProps {
    operatorProfile: UserDetails;
    operatorCallsCount: number;
    operatorMonthlyCallsDuration: number;
    operatorMonthlySentimentAnalysis: Sentiments;
    AllBarChartData: Array<any>;
    operatorsCalls: Array<string>
}

interface Sentiments {
    average_positive_pct: number;
    average_negative_pct: number;
    average_neutral_pct: number;
}