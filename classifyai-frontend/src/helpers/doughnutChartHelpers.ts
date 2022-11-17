import { ChartOptions } from 'chart.js';

export const chartData = (positivePct: number, negativePct: number, neutralPct: number) => {
    const dataToReturn = {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [
            {
                data: [positivePct, negativePct, neutralPct],
                backgroundColor: [
                    '#41D847',
                    '#EF1C26',
                    '#FFD000',
                ],
                borderWidth: 0,
            },

        ],
    }
    return dataToReturn;
}

export const options: ChartOptions<'doughnut'> = {
    plugins: {
        legend: {
            position: 'left',
            align: "end",
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 15,
            }
        },
    },
}

export const optionsTopLegend: ChartOptions<'doughnut'> = {
    plugins: {
        legend: {
            position: 'right',
            align: "start",
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 10,
            }
        },
    },
    responsive: false,
    maintainAspectRatio: false,
}