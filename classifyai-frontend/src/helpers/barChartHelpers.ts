export const barChartData = (arrayLabels: Array<string>, arrayPositivePct: Array<number>, arrayNegativePct: Array<number>, arrayNeutralPct: Array<number>) => {
    const dataToReturn = {
        labels: arrayLabels,
        datasets: [
            {
                label: 'Positive',
                data: arrayPositivePct,
                backgroundColor: '#41D847',
            },
            {
                label: 'Negative',
                data: arrayNegativePct,
                backgroundColor: '#EF1C26',
            },
            {
                label: 'Neutral',
                data: arrayNeutralPct,
                backgroundColor: '#FFD000',
            },
        ],
    }
    return dataToReturn;
}

