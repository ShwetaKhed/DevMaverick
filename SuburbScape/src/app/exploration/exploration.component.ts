import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Suburb } from '../models/suburb.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})


export class ExplorationComponent {
  minRent = 0;
  maxRent = 0;
  suburbList: Suburb[] = [];
  options = [
    { value: 'Any', label: 'Any' },
    { value: '200', label: '$200' },
    { value: '300', label: '$300' },
    { value: '400', label: '$400' },
    { value: '500', label: '$500' }
  ];
  option1 = [ { value: 'Any', label: 'Any' }];

  constructor(private router: Router, private http: HttpClient,
     private sharedService: SharedService) {

      }

  search(){
   if(this.minRent == 0 || this.maxRent == 0){
    alert("Please select min and max rent");
    return;
   }
    console.log(this.minRent);
    if (String(this.minRent) == "Any")
    {
      this.minRent = 200;
    }

    this.http.get<any>('http://localhost:5000/api/rent_data').subscribe((response) => {
    this.suburbList = [];
     for (var i = 0; i < response.length; i++)
     {
      var median = response[i]["Median"];
      if (Number(this.minRent) <= Number(median) && Number(median) <= Number(this.maxRent))
      {
        this.suburbList.push(response[i]);
      }
     }
     if (this.minRent)
     this.sharedService.suburbList = this.suburbList;
     this.router.navigate(['/recommend']);
    });

  }

  onOptionSelected(event: any) {
    const selectedValue = event.value;
    interface OptionMapping {
      value: string;
      label: string;
    }

    interface OptionMappings {
      [key: string]: OptionMapping[];
    }

    const optionMappings: OptionMappings = {
      "Any": [
        { value: 'Any', label: '$Any' },
        { value: '200', label: '$200' },
        { value: '300', label: '$300' },
        { value: '400', label: '$400' },
        { value: '500', label: '$500' },
        { value: '600', label: '$600' }
      ],
      "200": [
        { value: '300', label: '$300' },
        { value: '400', label: '$400' },
        { value: '500', label: '$500' },
        { value: '600', label: '$600' }
      ],
      "300": [
        { value: '400', label: '$400' },
        { value: '500', label: '$500' },
        { value: '600', label: '$600' }
      ],
      "400": [
        { value: '500', label: '$500' },
        { value: '600', label: '$600' }
      ],
      "500": [
        { value: '600', label: '$600' }
      ]
    };

    this.option1 = optionMappings[selectedValue] || [];

  }

}
