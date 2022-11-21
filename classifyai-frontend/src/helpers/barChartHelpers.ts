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

export const parseAndGetBarChartData = (data: object | any) => {
    const labels = Object.keys(data);
    const positiveData = []
    const negativeData = []
    const neutralData = []
    for (const date in data) {
        for (const dailyEval in data[date]) {

            switch (dailyEval) {
                case "average_positive_pct":
                    positiveData.push(data[date][dailyEval])
                    break;
                case "average_negative_pct":
                    negativeData.push(data[date][dailyEval])
                    break;
                case "average_neutral_pct":
                    neutralData.push(data[date][dailyEval])
                    break;
                default:
                    break;
            }
        }
    }
    return [labels, positiveData, negativeData, neutralData]
}
