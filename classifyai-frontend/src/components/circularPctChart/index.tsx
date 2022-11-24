import "./index.scss";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import { CircularPctChartProps } from "./CircularPctChartProps";
import { circularPctStyles } from "./circularPctChartStylesConfig";

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
                    styles={circularPctStyles}
                />
            </div>
        </div>
    )
}

export default CircularPctChart;