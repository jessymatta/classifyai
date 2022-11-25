import "./index.scss"
import { useState, useEffect } from "react"
import Footer from '../../components/footer'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import DashboardHOC from '../../hoc/DashboardHOC'
import { useGetOperatorStats } from "../../query/operator/useOperator"
import OperatorProfileTabs from "../../components/operatorProfileTabs"
import { parseAndGetBarChartData } from "../../helpers/barChartHelpers"
import { OperatorStatsResponse } from "./OperatorDashResponse"

const DashboardOperator = () => {

    const { data: allOperatorStats, isSuccess: operatorStatsSuccess } = useGetOperatorStats()
    const [operatorStats, setOperatorStats] = useState<OperatorStatsResponse>()
    const [barChartData, setBarChartData] = useState<any>([])

    useEffect(() => {
        if (allOperatorStats) {
            console.log(allOperatorStats.data.operator_profile)
            setOperatorStats(allOperatorStats.data)
            setBarChartData(parseAndGetBarChartData(allOperatorStats.data.operator_last7_days_analysis))
        }
    }, [allOperatorStats])

    return (
        <DashboardHOC>
            <Sidebar />
            <Header />
            <div className="operator__dashboard">


                {operatorStats &&
                    <OperatorProfileTabs
                        operatorProfile={operatorStats.operator_profile}
                        operatorCallsCount={operatorStats.operator_calls_count}
                        operatorMonthlyCallsDuration={operatorStats.operator_monthly_total_calls_duration}
                        operatorMonthlySentimentAnalysis={operatorStats.operator_monthly_sentiment_analysis}
                        AllBarChartData={barChartData}
                        operatorsCalls={operatorStats.operator_calls_info}
                    />
                }
            </div>
            <Footer />
        </DashboardHOC>
    )
}

export default DashboardOperator