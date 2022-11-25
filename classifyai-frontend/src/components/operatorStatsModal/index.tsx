import "./index.scss";
import { useState, useEffect } from "react";
import OperatorProfileTabs from "../operatorProfileTabs";
import { useOperatorStats } from "../../query/operators/useOperators";
import { parseAndGetBarChartData } from "../../helpers/barChartHelpers";
import { OperatorStatsModalProps, OperatorStatsResponse } from "./OperatorStatsInterfaces";

const OperatorStatsModal = ({ onClose, id }: OperatorStatsModalProps) => {

    const { data: operatorStats, isSuccess: operatorStatsSuccess } = useOperatorStats(id);
    const [currentOperatorStats, setCurrentOperatorStats] = useState<OperatorStatsResponse>();
    const [barChartData, setBarChartData] = useState<any>([]);

    useEffect(() => {
        if (operatorStatsSuccess) {
            setCurrentOperatorStats(operatorStats.data);
            setBarChartData(parseAndGetBarChartData(operatorStats.data.operator_last7_days_analysis));
        }
    }, [operatorStats])

    return (
        <div className="overlay">

            <div className='operatorstats'>
                <p className='operatorstats__close'><span onClick={onClose}>X</span></p>
                <div className="operatorstats__content">
                    {currentOperatorStats &&
                        <OperatorProfileTabs
                            operatorProfile={currentOperatorStats.operator_profile}
                            operatorCallsCount={currentOperatorStats.operator_calls_count}
                            operatorMonthlyCallsDuration={currentOperatorStats.operator_monthly_total_calls_duration}
                            operatorMonthlySentimentAnalysis={currentOperatorStats.operator_monthly_sentiment_analysis}
                            AllBarChartData={barChartData}
                            operatorsCalls={currentOperatorStats.operator_calls_info}
                        />}
                </div>

            </div>
        </div>

    )
}

export default OperatorStatsModal;