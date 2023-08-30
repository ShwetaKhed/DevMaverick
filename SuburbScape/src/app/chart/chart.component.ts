import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { Suburb } from '../models/suburb.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public chart: any;
  suburbList: Suburb[] = [];
  labels : string[] = [];
  rent: number[] = [];
  delayed = false;

  ngOnInit(): void {
    this.http.get<any>('https://devmaverick.azurewebsites.net/api/data').subscribe((response) => {
      this.suburbList = response;
      // sorted data by rent
      const sortedDataByRent = this.suburbList.slice();
      sortedDataByRent.sort((a, b) => b.Median - a.Median);
      console.log(sortedDataByRent);
      this.sharedService.highestRent = sortedDataByRent[0].Median;
      this.sharedService.suburbWithHighestRent = sortedDataByRent[0].LGA;

      // sorted data by crime
      const sortedDataByCrime = this.suburbList.slice();
      sortedDataByCrime.sort((a, b) => b.Offence_Count - a.Offence_Count);
      console.log(sortedDataByCrime);
      this.sharedService.highestCrime = sortedDataByCrime[0].Offence_Count;
      this.sharedService.suburbWithHighestCrime = sortedDataByCrime[0].LGA;

      this.suburbList = this.suburbList.slice(0, 8)
      this.suburbList.forEach(median => {
      this.labels.push(String(median.LGA));
      this.rent.push(median.Median)

      });
      this.createChart();
        });
  }

  constructor(
    private sharedService: SharedService,  private http: HttpClient) {


     }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar',
      options: {
        aspectRatio:2,
        animation: {
          onComplete: () => {
            this.delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !this.delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },

      data: {
        labels: this.labels,
	       datasets: [
          {
            label: "Rent per week",
            data: this.rent,
            backgroundColor: "#FFA500"
          }
        ]
      }

    });
  }



}
