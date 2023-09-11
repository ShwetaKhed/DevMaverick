import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Suburb } from '../models/suburb.model';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


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
     private sharedService: SharedService, private snackBar: MatSnackBar,
     public dialog: MatDialog) {
      this.http.get<any>('https://dev04backend.azurewebsites.net/api/data').subscribe((response) => {
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


   if (String(this.minRent) == "Any" && String(this.maxRent) == "Any"){
    this.minRent = 200;
    this.maxRent = 600;
  }
   else if (String(this.minRent) == "Any")
    {
      this.minRent = 200;
    }
    else if (String(this.maxRent) == "Any"){
      this.maxRent = 600;
    }

   for (var i = 0; i < this.suburbList.length; i++)
   {
    var median = this.suburbList[i]["Median"];

    if (Number(this.minRent) <= Number(median) && Number(median) <= Number(this.maxRent))
    {
      this.sharedService.selectedSuburb.push(this.suburbList[i]);
    }
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
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

}


