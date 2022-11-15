import React, { useEffect, useState } from 'react'
import "./index.scss"
import Card from '../../components/cardType1'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import DashboardHOC from '../../hoc/DashboardHOC'
import HappyEmoji from "../../assets/images/happy_emoji.svg"
import Trophy from "../../assets/images/trophy.svg"
import AngryEmoji from "../../assets/images/angry_emoji.svg"
import PersonDown from "../../assets/images/person_down.svg"
import DoughnutChartCard from '../../components/doughnutChartCard'
import SmallCard from '../../components/cardType2'
import PhoneIcon from "../../assets/images/phone_green.svg"
import Operator from "../../assets/images/operator.svg"
import BarChartCard from '../../components/barChartCard'
import PeopleWithCharts from "../../assets/images/ppl_with_chart.svg"
import { useDashboardStats } from '../../query/dashboard/useDashboard'
import { DashboardStats } from './DashboardStatsProps'
import { parseAndGetBarChartData } from '../../helpers/barChartHelpers'

const Dashboard = () => {
    const { data: allDashboardStats, isLoading: isLoadingDashboardStats, isSuccess: dashDataSuccess } = useDashboardStats()
    const [barChartData, setBarChartData] = useState<any>([])
    const [dashboardData, setDashboardData] = useState<DashboardStats>({
        total_operators_number: 0,
        total_calls_duration_this_month: "",
        daily_sentiment_analysis_avg: {},
        last_7_days_analysis_avg: {},
        best_worst_operator: {
            best_operator: { average_positive_pct: 0, operator: { first_name: "", last_name: "", username: "" } },
            worst_operator: { average_negative_pct: 0, operator: { first_name: "", last_name: "", username: "" } }
        }
    });

    useEffect(() => {
        if (dashDataSuccess) {
            setDashboardData(allDashboardStats.data)
            setBarChartData(parseAndGetBarChartData(allDashboardStats.data.last_7_days_analysis_avg));
        }
    }, [allDashboardStats])

    return (

        <DashboardHOC>
            <Sidebar />
            <Header />
            <div className='dashboard__container'>
                <div className="top">
                    <div className="top__left">
                        <div className="top__left--left">
                            <Card
                                title={"Operator of the month"}
                                firstName={dashboardData.best_worst_operator.best_operator.operator.first_name}
                                lastName={dashboardData.best_worst_operator.best_operator.operator.last_name}
                                username={dashboardData.best_worst_operator.best_operator.operator.username}
                                emoji={HappyEmoji}
                                percentage={dashboardData.best_worst_operator.best_operator.average_positive_pct}
                                image={Trophy}
                                type={"good"}
                            />

                            <SmallCard
                                stats={`${dashboardData.total_calls_duration_this_month} min`}
                                title={"Total calls duration"}
                                subtitle={"calculated this month"}
                                image={PhoneIcon}
                            />
                        </div>
                        <div className="top__left--right">
                            <Card
                                title={"NOT Operator of the month "}
                                firstName={dashboardData.best_worst_operator.worst_operator.operator.first_name}
                                lastName={dashboardData.best_worst_operator.worst_operator.operator.last_name}
                                username={dashboardData.best_worst_operator.worst_operator.operator.username}
                                emoji={AngryEmoji}
                                percentage={dashboardData.best_worst_operator.worst_operator.average_negative_pct}
                                image={PersonDown}
                                type={"bad"}
                            />

                            <SmallCard
                                stats={`${dashboardData.total_operators_number}`}
                                title={"Total operators"}
                                image={Operator}
                            />

                        </div>
                    </div>
                    <div className="top__right">
                        <DoughnutChartCard title={"Satisfaction Level"} subtitle={"calculated today"}
                            data={[
                                dashboardData.daily_sentiment_analysis_avg.average_positive_pct,
                                dashboardData.daily_sentiment_analysis_avg.average_negative_pct,
                                dashboardData.daily_sentiment_analysis_avg.average_neutral_pct
                            ]}
                        />
                    </div>
                </div>

                <div className="bottom">
                    <div className="bottom__left">
                        <BarChartCard
                            title={"Sentiment Analysis Average"}
                            subtitle={"calculated the last 7 days"}
                            labels={barChartData[0]}
                            positivePctArray={barChartData[1]}
                            negativePctArray={barChartData[2]}
                            neutralPctArray={barChartData[3]}
                        />

                    </div>

                    <div className="bottom__right">
                        <img className="image" src={PeopleWithCharts} alt="ppl-with-charts" />
                    </div>
                </div>

            </div>
            <Footer />
        </DashboardHOC>
    )
}

export default Dashboard