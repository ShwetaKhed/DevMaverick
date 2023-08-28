import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Suburb } from '../models/suburb.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {

  constructor(private sharedService: SharedService, private http: HttpClient) { }


  items: Suburb[] = [];
  expandedIndex = 0;

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/api/crime_data').subscribe((resp => {
      for (var i =0; i < this.sharedService.suburbList.length; i++){
        for (var j =0; j < resp.length; j++){

          if (this.sharedService.suburbList[i].LGA == resp[j].LGA) {
            console.log(this.sharedService.suburbList[i])
            this.sharedService.suburbList[i].Crime = resp[j].Offence_Count;
            this.sharedService.suburbList[i].CrimePerData = resp[j].Rate_per_100000_population;
            this.items.push(this.sharedService.suburbList[i]);
          }
        }
      }
    }));

  }
  back (){

  }

}
