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
  suburb = "";
  expandedIndex = 0;
  showDiv = false;
  temp:any;
  shouldShow = true;
  desc = "";
  crime = 0;
  rent = 0;
  suburb_list = [
    { value: '', label: '' }

  ];
  ngOnInit(): void {
    this.items = this.sharedService.selectedSuburb;
    this.suburb_list.pop();
    for (var i = 0; i< this.sharedService.selectedSuburb.length; i++){
      this.suburb_list.push( { value: this.sharedService.selectedSuburb[0].LGA,
        label: this.sharedService.selectedSuburb[i].LGA })
    }

  }
  showItem(){
    this.shouldShow = false;
  }

  createChart( median:Number, LGA:string, crime:number){
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

  go(){

    this.showDiv = true;
    for (var i = 0; i< this.sharedService.selectedSuburb.length; i++){
      if (this.suburb == this.sharedService.selectedSuburb[i].LGA)
      {
          this.desc = this.sharedService.selectedSuburb[i].Description;
          this.crime = this.sharedService.selectedSuburb[i].Rate_per_100000_population
          this.rent = this.sharedService.selectedSuburb[i].Median
      }
    }
    this.createChart(this.rent, this.suburb, this.crime  );
  }

}
