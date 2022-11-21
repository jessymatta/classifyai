import "./index.scss"
import "react-circular-progressbar/dist/styles.css"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { CircularPctChartProps } from "./CircularPctChartProps"

const CircularPctChart = ({ percentage, title, subtitle }: CircularPctChartProps) => {
    return (
        <div className="circularPct__card">
            <p>{title}</p>
            <p className='subtitle'>{subtitle}</p>
            <div className='circularPct'>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={20}
                    styles={buildStyles({
                        strokeLinecap: "butt",
                        textColor: "#949494",
                        pathColor: "#41D847",
                        trailColor: "#949494"
                    })}
                />
            </div>
        </div>

    )
}

export default CircularPctChart