import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { mapValueToEvent } from "../../utils";
import gridIntervals from "./gridIntervals";

const XYChart = (chart: any, data: any) => {
  var indicator: any;
  const showIndicator = () => {
    if (indicator) {
      indicator.show();
    } else {
      indicator = chart.tooltipContainer.createChild(am4core.Container);
      indicator.background.fill = am4core.color("#fff");
      indicator.background.fillOpacity = 0.8;
      indicator.width = am4core.percent(100);
      indicator.height = am4core.percent(100);

      var indicatorLabel = indicator.createChild(am4core.Label);
      indicatorLabel.text = "There is no data to show on this chart.";
      indicatorLabel.align = "center";
      indicatorLabel.valign = "middle";
      indicatorLabel.fontSize = 20;
    }
  };
  const hideIndicator = () => {
    indicator.hide();
  };

  // no data
  chart.events.on("beforedatavalidated", function (event: any) {
    if (event.target.data.length === 0) {
      showIndicator();
    } else if (indicator) {
      hideIndicator();
    }
  });

  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.baseInterval = {
    timeUnit: "minute",
    count: 1,
  };

  dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 75;

  dateAxis.dateFormats.setKey("minute", "hh:mm a");
  dateAxis.gridIntervals.setAll(gridIntervals);
  dateAxis.skipEmptyPeriods = true;
  dateAxis.markUnitChange = false;
  dateAxis.title.text = "Time (hours)";
  dateAxis.title.fontWeight = "bold";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.title.text = "Event type (mood)";
  valueAxis.title.fontWeight = "bold";

  valueAxis.renderer.labels.template.adapter.add(
    "text",
    function (text: string, _: any) {
      return mapValueToEvent(text);
    },
  );

  //   series
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.dateX = "time";
  series.dataFields.valueY = "value";
  series.fillOpacity = 0.3;

  series.adapter.add("tooltipText", (text: any, target: any) => {
    let data = target.tooltipDataItem.dataContext;
    if (data) {
      return "event: [bold]{category}[/]\ndate: {time}";
    } else {
      return text;
    }
  });

  //   columntemplate

  // series.columns.template.strokeWidth = 1;
  series.columns.template.strokeOpacity = 0;

  series.columns.template.width = 30;
  series.columns.template.column.cornerRadiusTopLeft = 20;
  series.columns.template.column.cornerRadiusTopRight = 20;

  series.fillOpacity = 0.6;

  // color

  // series.columns.template.adapter.add(
  //   "fill",
  //   function (fill: any, target: any) {
  //     return chart.colors.getIndex(target.dataItem.index);
  //   },
  // );

  series.columns.template.adapter.add(
    "fill",
    function (fill: any, target: any) {
      if (target.dataItem.valueY >= 3) {
        return am4core.color("#4cba6a");
      } else if (target.dataItem.valueY === 2) {
        return chart.colors.getIndex(0);
      } else if (target.dataItem.valueY === 1) {
        return am4core.color("#f47174");
      } else {
        return chart.colors.getIndex(1);
      }
    },
  );

  //   cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineY.opacity = 0;
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);

  chart.scrollbarX.events.on("validated", function () {
    chart.scrollbarX.scrollbarChart.xAxes
      .getIndex(0)
      .gridIntervals.setAll(gridIntervals);
  });

  chart.events.on("datavalidated", function () {
    dateAxis.zoom({ start: 0, end: 1 });
  });

  dateAxis.keepSelection = true;
};

export default XYChart;
