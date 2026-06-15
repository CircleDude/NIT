import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import { tGroup } from "../groupdata";
import { tSeries } from "./SettingChart";
import * as React from 'react';

type GroupProps = {
  data: tGroup;
  series: tSeries;
  isBar: boolean;
};

function GroupChart({ data, series, isBar }: GroupProps) {
  const activeSeries = Object.entries(series).filter(([, value]) => value);

  const seriesY = activeSeries.map(([key]) => ({
    dataKey: key,
    label: key,
    ...(activeSeries.length === 1 ? { barLabel: 'value' as const, barLabelPlacement: 'outside' as const } : {}),
  }));

  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
    height: 400,
  };

  return (
    <Container maxWidth="lg">
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          {...chartSetting}
        />
      )}
    </Container>
  );
}

export default GroupChart;