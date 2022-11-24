import "./index.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SmallCard from "../cardType2";
import DoughnutChartCard from "../doughnutChartCard";
import EmployeeProfileCard from "../employeeProfileCard";
import PhoneIconGreen from "../../assets/images/phone_green.svg";
import BarChartCard from "../barChartCard";
import PhoneIconYellow from "../../assets/images/phone_yellow.svg";
import SingleOperatorCalls from "../singleOperatorCalls/singleOperatorCalls";
import { OperatorProfileTabsProps } from "./operatorProfileTabsProps";

const OperatorProfileTabs = ({
    operatorProfile,
    operatorCallsCount,
    operatorMonthlyCallsDuration,
    operatorMonthlySentimentAnalysis,
    AllBarChartData,
    operatorsCalls }: OperatorProfileTabsProps) => {

    return (
        <div>
            <Tabs>
                <TabList className="tab__labels">
                    <Tab className="tab">OVERVIEW</Tab>
                    <Tab className="tab">CALLS</Tab>
                </TabList>

                <TabPanel className="tab1__container">
                    <div className="tab1__container--left">
                        <EmployeeProfileCard
                            userProfile={operatorProfile}
                        />
                    </div>
                    <div className="tab1__container--right">

                        <div className="tab1__container--right-top">
                            <DoughnutChartCard
                                title={"Satisfaction Level"}
                                subtitle={"calculated this month"}
                                data={[
                                    operatorMonthlySentimentAnalysis.average_positive_pct,
                                    operatorMonthlySentimentAnalysis.average_negative_pct,
                                    operatorMonthlySentimentAnalysis.average_neutral_pct
                                ]}
                                shadow={true}
                            />
                            <div className='smallCards'>
                                <SmallCard
                                    stats={`${operatorMonthlyCallsDuration} min`}
                                    title={"Total Calls Duration"}
                                    image={PhoneIconGreen}
                                />
                                <SmallCard
                                    stats={`${operatorCallsCount}`}
                                    title={"Total Calls Number"}
                                    image={PhoneIconYellow}
                                />
                            </div>
                        </div>

                        <div className="tab1__container--right-bottom">

                            <BarChartCard
                                title={"Sentiment Analysis Average"}
                                subtitle={"calculated this week"}
                                labels={AllBarChartData[0]}
                                positivePctArray={AllBarChartData[1]}
                                negativePctArray={AllBarChartData[2]}
                                neutralPctArray={AllBarChartData[3]}
                            />
                        </div>

                    </div>
                </TabPanel>

                <TabPanel>
                    {operatorsCalls && <SingleOperatorCalls
                        calls={operatorsCalls}
                    />}
                </TabPanel>

            </Tabs>
        </div>
    )
}

export default OperatorProfileTabs;