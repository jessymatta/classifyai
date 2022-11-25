import "./indes.scss";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CardChartProps } from './CardChartProps';
import { chartData, options, optionsTopLegend } from "../../helpers/doughnutChartHelpers";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartCard = ({ title, subtitle, data, shadow }: CardChartProps) => {
    const dataToPass = chartData(data[0], data[1], data[2]);
    return (
        <div className={shadow ? 'card__chart shadow' : 'card__chart'}>
            <div className='card__chart--title'>
                {title}
            </div>
            <p className='card__chart--subtitle'>{subtitle}</p>
            <Doughnut data={dataToPass} options={shadow ? optionsTopLegend : options} />
        </div>
    )
}

export default DoughnutChartCard