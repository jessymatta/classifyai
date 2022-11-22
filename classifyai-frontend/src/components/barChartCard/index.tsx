import "./indes.scss"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { barChartData } from '../../helpers/barChartHelpers'
import { BarChartProps } from "./BarChartProps"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartCard = ({ title, subtitle, labels, positivePctArray, negativePctArray, neutralPctArray }: BarChartProps) => {
    const data = barChartData(labels, positivePctArray, negativePctArray, neutralPctArray);
    return (
        <div className="barchart">
            <p className='barchart__title'>{title}</p>
            <p className='barchart__subtitle'>{subtitle}</p>
            <div className='barchart__wrapper'>
                <Bar options={{ maintainAspectRatio: false }} data={data} />
            </div>
        </div>
    )
}

export default BarChartCard