import { Chart as ChartType } from "@amcharts/amcharts4/charts";
import {
  addLicense,
  create,
  ExportMenu,
  useTheme,
} from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { ReactElement, useRef } from "react";

import "../../styles/chart.css";

export type ChartProps<T extends ChartType, Item extends {} = {}> = {
  data: any[];
  isAnimated?: boolean;
  isExportable?: boolean;
  style?: React.CSSProperties;
  type: new () => T;

  onChartReady(chart: T, data?: any[]): void;
  onDataReady?(data: Item[]): Item[];
};

const getNewChartId = () => {
  //   return `chart-div-${Math.random() * 10000000}`;
  return `chart-div-2`;
};

const Chart = <T extends ChartType>(
  props: ChartProps<T>,
): ReactElement | null => {
  const idRef = useRef(getNewChartId());
  const chartRef = useRef<InstanceType<typeof props.type> | undefined>();

  const {
    data,
    isAnimated,
    isExportable,
    style,
    type,

    onChartReady,
    onDataReady,
  } = {
    isAnimated: true,
    isExportable: false,
    ...props,
  } as ChartProps<T>;

  if (isAnimated) {
    // Disabled linting because linter thinks `useTheme()` is a React hook
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTheme(am4themes_animated);
  }

  // Enable license
  if (process.env.REACT_APP_AMCHARTS_KEY) {
    addLicense(process.env.REACT_APP_AMCHARTS_KEY);
  }

  // Memoize data to prevent expensive re-renders
  const memoizedData = React.useMemo(() => {
    return onDataReady ? onDataReady(data) : data;
  }, [data, onDataReady]);

  // Handle component unmounting
  React.useEffect(() => {
    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  }, []);

  // Setup chart
  React.useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = create(idRef.current, type);

      if (isExportable) {
        chartRef.current.exporting.menu = new ExportMenu();
      }

      onChartReady(chartRef.current, memoizedData);
    }
  }, [isExportable, memoizedData, onChartReady, type]);

  // Load data into chart
  React.useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = memoizedData;
    }
  }, [memoizedData]);

  return <div className="chart" id={idRef.current} style={style} />;
};

export default Chart;
