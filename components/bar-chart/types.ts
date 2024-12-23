type BarData = {
  date: string;
  dateFormat: string;
  value: number;
  type: 'm5' | 'h1' | 'h6' | 'h24';
};

interface ILQDBarChart {
  data: Array<BarData>;
  period: PeriodValue;
}
