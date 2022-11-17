import "./index.scss"
import TitleComponent from '../titleBar'
import DoughnutChartCard from '../doughnutChartCard'
import SmallCard from "../../components/cardType2"
import PPLWithCharts2 from "../../assets/images/ppl_with_circular_chart.svg"
import CircularPctChart from '../circularPctChart'
import 'react-circular-progressbar/dist/styles.css';
import WordCount from "../../assets/images/word_icon.svg"
import { ScriptUploadDataModalProps } from "./ScriptUploadDataModalProps"

const ScriptUploadDataModal = (
    { customerPcts, operatorPcts, customerConfidenceAvg, operatorConfidenceAvg,
        customerTotalSentencesNbr, operatorTotalSentencesNbr, onClick
    }: ScriptUploadDataModalProps
) => {

    return (
        <div className='overlay'>

            <div className='scriptdata__container'>
                <div className='scriptdata'>

                    <TitleComponent
                        title={"Script Data"}
                        modal={true}
                        onClick={onClick}
                    />

                    <div className='scriptdata__content'>

                        <div className="scriptdata__content--top">

                            <div className="scriptdata__content--top-left">
                                <DoughnutChartCard
                                    title={"Satisfaction Level"}
                                    subtitle={"Customer"}
                                    data={customerPcts}
                                    shadow={true} />

                                <DoughnutChartCard
                                    title={"Satisfaction Level"}
                                    subtitle={"Operator"}
                                    data={operatorPcts}
                                    shadow={true} />

                            </div>
                            <div className="scriptdata__content--top-right">
                                <SmallCard
                                    stats={`${operatorTotalSentencesNbr}`}
                                    title={"Total sentences number"}
                                    image={WordCount}
                                    subtitle={"Operator"}
                                    shadow={true}
                                />

                                <SmallCard
                                    stats={`${customerTotalSentencesNbr}`}
                                    title={"Total sentences number"}
                                    image={WordCount}
                                    subtitle={"Customer"}
                                    shadow={true}
                                />
                            </div>
                        </div>


                        <div className="scriptdata__content--bottom">

                            <div className="scriptdata__content--bottom-left">
                                <CircularPctChart
                                    percentage={customerConfidenceAvg}
                                    title={"Average Confidence Level"}
                                    subtitle={"Customer"}
                                />
                                <CircularPctChart
                                    percentage={operatorConfidenceAvg}
                                    title={"Average Confidence Level"}
                                    subtitle={"Operator"}
                                />
                            </div>

                            <div className="scriptdata__content--bottom-right">
                                <img src={PPLWithCharts2} alt="ppl with charts" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScriptUploadDataModal