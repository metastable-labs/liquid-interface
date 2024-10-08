type BarData = {
  date: string;
  value: number;
};

interface ILQDBarChart {
  data: Array<BarData>;
  period: PeriodValue;
}
