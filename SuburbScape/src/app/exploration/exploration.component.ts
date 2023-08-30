import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Suburb } from '../models/suburb.model';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
     private sharedService: SharedService, private snackBar: MatSnackBar) {
      this.http.get<any>('https://devmaverick.azurewebsites.net/api/data').subscribe((response) => {
        console.log(response);
        this.suburbList = response;
        });
      }

  search(){
    this.sharedService.selectedSuburb = [];

   if(this.minRent == 0 || this.maxRent == 0){
    this.showSnackbar("Please select min and max rent");
    return;
   }

   for (var i = 0; i < this.suburbList.length; i++)
   {
    var median = this.suburbList[i]["Median"];

    if (Number(this.minRent) <= Number(median) && Number(median) <= Number(this.maxRent))
    {
      this.sharedService.selectedSuburb.push(this.suburbList[i]);
    }
   }

   if (this.sharedService.selectedSuburb.length == 0)
   {
    this.sharedService.selectedSuburb = this.suburbList;
   }

   this.router.navigate(['/recommend']);
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

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000, // Display duration in milliseconds
      verticalPosition: 'bottom', // Position of the snackbar
      horizontalPosition: 'center', // Position of the snackbar
    });
  }

}
