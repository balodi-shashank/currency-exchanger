import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss'],
})
export class HistoryChartComponent {
  chartData: any;
  chart: any;
  @Input() set data(value: any) {
    this.createChart(value);
  }

  constructor() {
    Chart.register(...registerables);
  }

  createChart(chartData: any) {
    let ctx: any = document.getElementById('lineChart') as HTMLElement;
    var data = {
      labels: [
        'Oct 2021',
        'Nov 2021',
        'Dec 2021',
        'Jan 2021',
        'Feb 2022',
        'Mar 2022',
        'Apr 2022',
        'May 2022',
        'Jun 2022',
        'Jul 2022',
        'Aug 2022',
        'Sep 2022',
      ],
      datasets: chartData,
    };

    //options
    var options = {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        text: 'Line Graph',
        fontSize: 18,
        fontColor: 'white',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: 'white',
          fontSize: 16,
        },
      },
    };

    var chartExist = Chart.getChart('lineChart'); // <canvas> id
    if (chartExist != undefined) chartExist.destroy();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }
}
