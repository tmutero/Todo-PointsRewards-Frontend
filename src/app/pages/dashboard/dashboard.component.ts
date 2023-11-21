import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  title = 'Dashboard';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: any;
  public pieChartDatasets: any;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllMetrics();
  }

  reportMetrics: any
  users: any = [];
  achievements: any = [];

  pieMetrics : any;

  getAllMetrics() {
    forkJoin([
      this.apiService.reportTasks(),
      this.apiService.reportPieMetrics(),

      
     
    ]).subscribe(([_reportMetrics,_pieMetrics]) => {
      this.reportMetrics = _reportMetrics;

      this.pieChartLabels = _pieMetrics[0]
      this.pieChartDatasets = [
        {
          data: _pieMetrics[1],
        },
      ]
    });
  }
}
