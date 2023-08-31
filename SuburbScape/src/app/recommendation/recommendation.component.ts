import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Suburb } from '../models/suburb.model';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {

  constructor(private sharedService: SharedService, private http: HttpClient) { }
  public chart: any;
  public piechart: any;
  items: Suburb[] = [];
  expandedIndex = 0;
  temp:any;
  shouldShow = true;
  ngOnInit(): void {
    this.items = this.sharedService.selectedSuburb;
  }
  showItem(){
    this.shouldShow = false;
  }

  createChart(index:number, median:Number, LGA:string, crime:number){

    this.expandedIndex = index;
    if (this.chart != undefined)
    {
      this.chart.destroy();
    }

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: [this.sharedService.suburbWithHighestRent , LGA],
        datasets: [{
          data: [this.sharedService.highestRent, median],
          label: "Rent comparison (Highest Rent  vs Selected Suburb Rent)",
          backgroundColor: ['#FF5733', '#36A2EB']
        }]
      },
      options: {
        indexAxis: 'y',
        aspectRatio:3,
        plugins:{
          title: {
            display: true,
            text: 'Weekly Rental Price Comparison',

          },
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
    if (this.piechart != undefined)
    {
      this.piechart.destroy();
    }
    this.piechart = new Chart("MyChart1", {
      type: 'pie',
      data: {
        labels: [this.sharedService.suburbWithHighestCrime , LGA],
        datasets: [{
          data: [this.sharedService.highestCrime, crime],
          label: "Crime Rate comparison (Highest Crime Rate vs Selected Suburb Crime Rate)",
          backgroundColor: ['#FF5733', '#36A2EB']
        }]
      },
      options: {
        aspectRatio:3,
        plugins:{
          title: {
            display: true,
            text: 'Yearly Offence Count Report (Highest VS Selected Suburb)',

          },
        }

      }
    });

  }

  getRandomMargin(){
    if (this.expandedIndex == 0 || this.expandedIndex == 1){
      return `30px`;
    }
    if (this.expandedIndex < 8 ){
    const randomMargin = 25 * this.expandedIndex + 100;
    return `${randomMargin}px`;
    }
    else if (this.expandedIndex > 7  && this.expandedIndex < 18)
    {
      const randomMargin = 30 * this.expandedIndex + 300;
      return `${randomMargin}px`;
    }
    else if (this.expandedIndex >= 18  && this.expandedIndex <= 30)
    {
      const randomMargin = 40 * this.expandedIndex + 400;
      return `${randomMargin}px`;
    }
    else if (this.expandedIndex >= 31  && this.expandedIndex <= 48)
    {
      const randomMargin = 40 * this.expandedIndex + 500;
      return `${randomMargin}px`;
    }
    return `20px`;

  }

}
