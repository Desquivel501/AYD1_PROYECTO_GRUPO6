import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Grid
} from '@mui/material';
import React, { useEffect, useState } from "react"; 
import Chart from "react-apexcharts";

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: true
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

export const ColumnChart = (props) => {
  const {sx, title, graph} = props;

  const chartOptions = useChartOptions(graph.labels);

  return (

    <Card sx={sx}>
      <CardContent>

        <CardHeader
          title={title}
        />

        <Chart
        //   height={300}
          options={chartOptions}
          series={graph.values}
          type="bar"
          width="100%"
        />
      </CardContent>
    </Card>  

  );
};