import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {
  @ViewChild("chart") chart: any; // Use any type for ViewChild to avoid issues
  @Input() grahamsCalculations: { creationDate: Date, intrinsicValue: number, companyName: string }[] = [];
  @Input() dividendDiscountCalculations: { creationDate: Date, intrinsicValue: number, companyName: string }[] = [];
  @Input() dcfCalculations: { creationDate: Date, intrinsicValue: number, companyName: string }[] = [];

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          distributed: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number, opts: any) {
          const dataIndex = opts.dataPointIndex;
          const creationDate = new Date(opts.w.config.series[0].data[dataIndex].creationDate).toLocaleDateString();
          return `$${val}\n(${creationDate})`;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["white"]
        }
      },
      xaxis: {
        categories: [],
        labels: {
          rotate: -45,
          style: {
            fontSize: "12px"
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: true
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          formatter: function (val: number) {
            return `$${val}`;
          }
        }
      },
      title: {
        text: "Intrinsic Value Over Time",
        floating: false,
        offsetY: 10,
        align: "center",
        style: {
          color: "white"
        }
      },
      tooltip: {
        enabled: true,
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
          const creationDate = new Date(data.creationDate).toLocaleDateString();
          return `<div class="apexcharts-tooltip-title">${data.x}</div>
                  <div>Intrinsic Value: $${data.y}</div>
                  <div>Date: ${creationDate}</div>`;
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grahamsCalculations'] && changes['grahamsCalculations'].currentValue) {
      this.updateChart(this.grahamsCalculations);
    } else if (changes['dividendDiscountCalculations'] && changes['dividendDiscountCalculations'].currentValue) {
      this.updateChart(this.dividendDiscountCalculations);
    } else if (changes['dcfCalculations'] && changes['dcfCalculations'].currentValue) {
      this.updateChart(this.dcfCalculations);
    }
  }

  updateChart(data: { creationDate: Date, intrinsicValue: number, companyName: string }[]): void {
    const seriesData = data.map((item) => ({
      x: item.companyName,
      y: item.intrinsicValue,
      creationDate: item.creationDate
    }));

    seriesData.sort((a, b) => a.x.localeCompare(b.x));

    this.chartOptions.series = [
      {
        name: "Intrinsic Value",
        data: seriesData
      }
    ];

    this.chartOptions.xaxis.categories = seriesData.map(item => item.x);
  }
}
