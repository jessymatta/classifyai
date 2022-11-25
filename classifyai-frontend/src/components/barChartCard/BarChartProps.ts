export interface BarChartProps {
    title: string;
    subtitle?: string;
    labels: Array<string>;
    positivePctArray: Array<number>;
    negativePctArray: Array<number>;
    neutralPctArray: Array<number>;
}