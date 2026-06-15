import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart} from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import { tGroup } from "../../../list/table";
import { tSeries } from "./SettingChart";
import * as React from 'react';

type GroupProps = {
 data: tGroup;
 series: tSeries;
 isBar: boolean;
};

function GroupChart({ data, series, isBar }: GroupProps) {
  
  let seriesY = Object.entries(series)
    .filter(item => item[1] == true)
    .map(item => {
       return {"dataKey": item[0], "label": item[0]}
     });

  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
    height: 400,
  };

  function someChart(flag: boolean) {
    if (flag) return(
      <BarChart
        dataset={ data }
        xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
        series={ seriesY }
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'center' },
          },
        }}
        {...chartSetting}
      />);
    else return(
      <LineChart
        dataset={ data }
        xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
        series={ seriesY}
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'center' },
          },
        }}
        {...chartSetting}
      />);
  }

  return(
    <Container maxWidth="lg">
      { someChart(isBar) }
    </Container>
  )
}

export default GroupChart;