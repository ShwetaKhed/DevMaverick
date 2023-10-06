import { Component } from '@angular/core';
import { Suburb } from '../models/suburb.model';
import { employment } from '../models/employment.model';
import { community } from '../models/community.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent {
  completedCondition = true;
  completedCondition1 = true;
  completedCondition2 = true;
  minRent = 0;
  maxRent = 0;
  occ = "";
  sub = "";
  sub1 = "";
  map: any;
  geojsonData: any;
  suburbList: Suburb[] = [];
  employmentList: employment[] = [];
  communityList: community[] = [];
  icheck = false;
  checked: Boolean = false;
  checked1: Boolean = false;
  checked2: Boolean = false;
  checked3: Boolean = false;

  preselectedSuburb: Suburb[] = [];
  public chart: any;
  public piechart: any;
  suburb: string = '';
  desc: string = "";
  crime = 0;
  rent = 0;
  managers = 0;
  data: number[] = [];
  distance = 0;
  time = 0;
  hospital = 0;
  schools = 0;
  nursery = 0;
  compareSub = ""
  initialDisabled = true;
  completedCondition3 = true;
  imageUrl = "";

  options = [
    { value: '200', label: '$200' },
    { value: '300', label: '$300' },
    { value: '400', label: '$400' },
    { value: '500', label: '$500' }
  ];

  subList = [
    { value: 'NA', label: '' },
  ];
  subListAll = [
    { value: 'NA', label: '', rent: '' },
  ];
  compareSubList = [
    { value: 'NA', label: '' },
  ];
  occList = [
    { value: 'NA', label: 'N/A' },
    { value: 'Managers', label: 'Manager' },
    { value: 'Professionals', label: 'Professional' },
    { value: 'Clerical', label: 'Clerical/ administrative workers' },
    { value: 'Community', label: 'Community/ personal service workers' },
    { value: 'Labourers', label: 'Labourers' },
    { value: 'Drivers', label: 'Machinery operators/drivers' },
    { value: 'Sales', label: 'Sales workers' },
    { value: 'Technicians', label: 'Technicians/trades workers' }

  ];
  option1 = [ { value: '', label: '' }];
  dataDictJobs: string[] = [];
  top3 : Suburb[] = [];
  top_Suburb: Suburb[] = [];
  items = [
    {
      title: 'Schools in the region'},
    {
      title: 'Safety of the region'},
    {
      title: 'Hospitals in the region' },
    {
      title: 'Distance to Melbourne' }
  ];
  schoolScore = 0;
  safetyScore = 0;
  hospitalScore = 0;
  distanceScore = 0;

  constructor(private router: Router, private http: HttpClient,
    private sharedService: SharedService, private snackBar: MatSnackBar) {
     this.http.get<any>('https://dev04final.azurewebsites.net/api/data').subscribe((response) => {
       this.suburbList = response;
       });
       this.http.get<any>('https://dev04backend.azurewebsites.net/api/emp_data').subscribe((resp) => {
         this.employmentList = resp;
       });
       this.http.get<any>('https://dev04backend.azurewebsites.net/api/pro_data').subscribe((response1) => {
         this.communityList = response1;
       });
       this.http.get<any>('https://dev04backend.azurewebsites.net/api/rent_new_data').subscribe((response2) => {
        this.subListAll = [];
         for (var i = 0; i < response2.length; i++){
          this.subListAll.push({ value: response2[i].LGA, label: response2[i].LGA, rent: response2[i].Rent});
         }
         this.subListAll.sort((a, b) => {
          return a.value.localeCompare(b.value);
        });
       });

     }

  drop(event: CdkDragDrop<{title: string; }[]>) {

    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }


  onOptionSelected(event: any) {
    const selectedValue = event.value;
    this.initialDisabled = false;
    interface OptionMapping {
      value: string;
      label: string;
    }

    interface OptionMappings {
      [key: string]: OptionMapping[];
    }

    const optionMappings: OptionMappings = {
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

  getClassname(completedCondition: boolean): string {
    return completedCondition ? 'current' : 'complete prev-step';
  }

  getClassname1(completedCondition1: boolean): string {
    if (!this.completedCondition2)
    {
      return 'complete prev-step';
    }
    return completedCondition1 ? 'locked' : 'current';
  }

  getClassname2(completedCondition2: boolean): string {
    if (!this.completedCondition3)
    {
      return 'complete prev-step';
    }
    return completedCondition2 ? 'locked' : 'current';
  }

  scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  onMaxOptionSelected() {
    this.completedCondition  = false;
    this.completedCondition1  = false;
    this.checked = true;
    this.icheck = true;

  }

  onProfSelected(){
    this.completedCondition2  = false;
    this.checked1 = true;
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 30000,
      panelClass: 'center-snackbar'
    });
  }

  search(){
    if (this.chart != undefined)
    {
      this.chart.destroy();
    }
    if (this.piechart != undefined)
    {
      this.piechart.destroy();
    }
    this.top3 = [];
    this.sharedService.selectedSuburb = [];
    if(this.minRent == 0){
      this.showSnackbar("Please select min rent");
      return;
     }
    else if ( this.maxRent == 0)
    {
      this.showSnackbar("Please select max rent");
      return;
    } else if (this.occ == "" )
    {
      this.showSnackbar("Please select profession");
      return;
    }
    if (this.checked3){
      this.checked3 = false;
    }
    this.checked2 = true;
    this.completedCondition3 = false;
    const yOffset = window.scrollY;

    setTimeout(() => {
      this.checked2 = false;
      this.checked3 = true;
    }, 10);
    setTimeout(() => {
      window.scrollTo({
        top: yOffset + 740,
        behavior: 'smooth'
      });


    for (var i = 0; i < this.suburbList.length; i++)
   {
    var median = this.suburbList[i]["Median"];
    if (Number(this.minRent) <= Number(median) && Number(median) <= Number(this.maxRent))
    {
      this.sharedService.selectedSuburb.push(this.suburbList[i]);
    }
   }
   for (var i = 0; i < this.sharedService.selectedSuburb.length; i++){
    for (var j = 0; j < this.employmentList.length; j++){
      if (this.sharedService.selectedSuburb[i].LGA == this.employmentList[j].LGA){
        this.sharedService.selectedSuburb[i].Managers = this.employmentList[j].Managers;
        this.sharedService.selectedSuburb[i].Professionals = this.employmentList[j].Professionals;
        this.sharedService.selectedSuburb[i].Clerical = this.employmentList[j].Clerical_and_administrative_workers;
        this.sharedService.selectedSuburb[i].Community = this.employmentList[j].Community_and_personal_service_workers;
        this.sharedService.selectedSuburb[i].Labourers = this.employmentList[j].Labourers;
        this.sharedService.selectedSuburb[i].Drivers = this.employmentList[j].Machinery_operators_and_drivers;
        this.sharedService.selectedSuburb[i].Sales = this.employmentList[j].Sales_workers;
        this.sharedService.selectedSuburb[i].Technicians = this.employmentList[j].Technicians_trades_workers;
      }
    }
   }


   if (this.occ == "Managers")
   {
    this.sharedService.selectedSuburb.sort((a, b) => b.Managers - a.Managers);
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   } else if (this.occ == "Professionals")
   {
    this.sharedService.selectedSuburb.sort((a, b) => b.Professionals - a.Professionals);
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   }  else if (this.occ == "Clerical")
   {
    this.sharedService.selectedSuburb.sort((a, b) => b.Clerical - a.Clerical);
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   }  else if (this.occ == "Community")
   {
    this.sharedService.selectedSuburb.sort((a, b) => b.Community - a.Community);
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   }  else if (this.occ == "Labourers")
   {
    this.sharedService.selectedSuburb.sort((a, b) => b.Labourers - a.Labourers);
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   }  else if (this.occ == "Drivers")
   {
    this.sharedService.selectedSuburb.sort((a, b) => b.Drivers - a.Drivers);
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   }  else if (this.occ == "Sales")
   {
    this.sharedService.selectedSuburb.sort((a, b) => b.Sales - a.Sales);
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   }  else if (this.occ == "Technicians")
   {
    this.sharedService.selectedSuburb.sort((a, b) => b.Technicians - a.Technicians);
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   } else {
    this.top3 = this.sharedService.selectedSuburb.slice(0, 3);
   }
   for (var i = 0; i< this.items.length; i++){
    if (this.items[i].title.split(' ')[0] == "Schools")
    {
      this.schoolScore = 4 - i;
    } else if (this.items[i].title.split(' ')[0] == "Safety")
    {
      this.safetyScore = 4 - i;
    } else if (this.items[i].title.split(' ')[0] == "Hospitals")
    {
      this.hospitalScore = 4 - i;
    } else if (this.items[i].title.split(' ')[0] == "Distance")
    {
      this.distanceScore = 4 - i;
    }
   }

   this.subList =[ ];
   // remove later
   this.setMapDetails();

   this.http.get<any>('https://dev04backend.azurewebsites.net/api/score_data').subscribe((response) => {
        for (var i =0; i < this.top3.length; i++){
          for (var j = 0; j < response.length; j++)
          {
            if (this.top3[i].LGA == response[j].LGA){
              this.top3[i].score =
              this.schoolScore * response[j].School_Score + this.safetyScore * response[j].Safety_Score +
              this.hospitalScore * response[j].Hospital_Score + this.distanceScore * response[j].Distance_Score;
            }
          }
          this.subList.push({ value: this.top3[i].LGA, label: this.top3[i].LGA });
        }
        for (var i = 0; i < this.communityList.length; i++){
          for (var j = 0; j < this.top3.length; j++){
            if (this.top3[j].LGA == this.communityList[i].LGA){
              this.top3[j].distance = this.communityList[i].Distance;
              this.top3[j].time = this.communityList[i].Travel_Time;
              this.top3[j].school =
              this.communityList[i].Number_of_schools +
               this.communityList[i].Number_of_kindergartens;
               this.top3[j].hospital =  this.communityList[i].Number_of_hospitals;
          }
        }
        }
       this.setMapDetails();
       this.top3.sort((a, b) => b.score - a.score);
       this.top_Suburb = this.top3.slice(0, 1);
       this.suburb = this.top_Suburb[0].LGA;
       this.desc = this.top_Suburb[0].Description;
       this.rent = this.top_Suburb[0].Median;
       this.sub = this.top_Suburb[0].LGA;
       this.imageUrl = "assets/" + this.top_Suburb[0].LGA + ".png";
       this.schools = this.top_Suburb[0].school;
       this.distance = this.top_Suburb[0].distance;
       this.time = this.top_Suburb[0].time;
       this.hospital = this.top_Suburb[0].hospital;
       this.crime = this.top_Suburb[0].Rate_per_100000_population/100000 * 1000;
       this.subListAll = this.subListAll.filter(item => item.value !== this.suburb);
  });

    }, 10);

  }

  setMapDetails(){
    this.map = L.map('leafletMap').setView([-37.471310, 144.785156], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
    const regionColors: { [key: string]: string } = {
    };

    for (var i =0; i < this.top3.length; i++){
      regionColors[this.top3[i].LGA.toUpperCase()] = 'red';
    }

    this.http.get<any>('assets/regional_vic.json').subscribe(geojsonData => {
      this.geojsonData = geojsonData;
      L.geoJSON(geojsonData, {
        style: function(feature) {
          if (feature && feature.properties) {
            const region = feature.properties.Region;
            const lga = feature.properties.LGA;
            const fillColor = regionColors[lga] ;
            return {
              fillColor: fillColor,
              weight: 1,
              opacity: 1,
              color: 'grey',
              fillOpacity: 0.2
            };
          }
          return {};

        },
        onEachFeature: function(feature, layer) {
          layer.bindTooltip( feature.properties.LGA);
        }
      }).addTo(this.map);

      this.map.on("click", () => {
        this.showSnackbar("Please select recommended suburbs from dropdown to view details.");
      });

    const dataDict: Record<string, number> = {};
    dataDict["Managers"] = this.top_Suburb[0].Managers;
    dataDict["Professionals"] = this.top_Suburb[0].Professionals;
    dataDict["Clerical/ administrative workers"] =  this.top_Suburb[0].Clerical;
    dataDict["Community/ personal service workers"] =
    this.top_Suburb[0].Community;
    dataDict["Labourers"] =  this.top_Suburb[0].Labourers;
    dataDict["Machinery operators/ drivers"] = this.top_Suburb[0].Drivers;
    dataDict["Sales workers"] = this.top_Suburb[0].Sales;
    dataDict["Technicians/ trades workers"] = this.top_Suburb[0].Technicians;

    const dataEntries = Object.entries(dataDict);
    console.log(dataEntries)
    dataEntries.sort((a, b) => b[1] - a[1]);
    const top3 = dataEntries.slice(0, 3);
    const top3Names = top3.map(entry => entry[0]);
    const top3Values = top3.map(entry => entry[1]);

    this.chart = new Chart("Chartx", {
      type: 'bar',
      data: {
        labels: top3Names,
        datasets: [{
          data: top3Values,
          label: "Top Employment Opportunities",
          backgroundColor: ['#FF5733', '#36A2EB', '#FFBF00']
        }]
      },
      options: {
        indexAxis: 'y',
        plugins:{
          title: {
            display: true,
            text: 'Employment Opportunities Comparision',
          },
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });

    });
  }

  reset() {
    this.occ = "";
    this.icheck = false;
    this.maxRent = 0;
    this.minRent = 0;
    this.checked3 = false;
    this.completedCondition = true;
    this.completedCondition1 = true;
    this.completedCondition2 = true;
    this.items = [
      {
        title: 'Schools in the region'},
      {
        title: 'Safety of the region'},
      {
        title: 'Hospitals in the region' },
      {
        title: 'Distance to Melbourne' }
    ];

  }

  scrollDown() {
    const yOffset = window.scrollY;
    window.scrollTo({
      top: yOffset + 650,
      behavior: "smooth"
    });
  }

  onSuburbSelected()
  {
    const dataDict: Record<string, number> = {};
    for (var i = 0; i <  this.top3.length; i++ )
    {
      if ( this.top3[i].LGA == this.sub){
       this.suburb = this.top3[i].LGA;
       this.desc = this.top3[i].Description;
       this.rent = this.top3[i].Median;
       this.imageUrl = "assets/" + this.top3[i].LGA + ".png";
       this.schools = this.top3[i].school;
       this.distance = this.top3[i].distance;
       this.time = this.top3[i].time;
       this.hospital = this.top3[i].hospital;
       this.crime = this.top3[i].Rate_per_100000_population;
       this.subListAll = this.subListAll.filter(item => item.value !== this.suburb);


    dataDict["Managers"] = this.top3[i].Managers;
    dataDict["Professionals"] = this.top3[i].Professionals;
    dataDict["Clerical/ administrative workers"] =  this.top3[i].Clerical;
    dataDict["Community/ personal service workers"] =
    this.top3[i].Community;
    dataDict["Labourers"] =  this.top3[i].Labourers;
    dataDict["Machinery operators/ drivers"] = this.top3[i].Drivers;
    dataDict["Sales workers"] = this.top3[i].Sales;
    dataDict["Technicians/ trades workers"] = this.top3[i].Technicians;
  }
}

    console.log(dataDict);
    const dataEntries = Object.entries(dataDict);
    dataEntries.sort((a, b) => b[1] - a[1]);
    const top3 = dataEntries.slice(0, 3);
    const top3Names = top3.map(entry => entry[0]);
    const top3Values = top3.map(entry => entry[1]);

    if (this.chart != undefined)
    {
      this.chart.destroy();
    }

    this.chart = new Chart("Chartx", {
      type: 'bar',
      data: {
        labels: top3Names,
        datasets: [{
          data: top3Values,
          label: "Top Employment Opportunities",
          backgroundColor: ['#FF5733', '#36A2EB', '#FFBF00']
        }]
      },
      options: {
        indexAxis: 'y',
        plugins:{
          title: {
            display: true,
            text: 'Employment Opportunities Comparision',
          },
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });



  }

  compareRent(){
    var data = 0;
    for (var i = 0; i < this.subListAll.length; i++)
    {
      if (this.subListAll[i].value == this.sub1)
      {
        break;
      }
    }
    if (this.piechart != undefined)
    {
      this.piechart.destroy();
    }
    this.piechart = new Chart("Charty", {
      type: 'pie',
      data: {
        labels: [this.sub1, this.suburb],
        datasets: [{
          data: [this.subListAll[i].rent, this.rent],
          label: "Median Rent Per Week",
          backgroundColor: ['Orange', 'Blue']
        }]
      },
      options: {
        plugins:{
          title: {
            display: true,
            text: 'Median Rent Comparision',
          },
        }
      }
    });

  }

  resetMap(){
    this.map.remove();
    this.setMapDetails();
  }



openSnackBar() {

  this.snackBar.open("sdjbfjkdsbfjkds", 'OK', {
    duration: 3000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
  });
}




}
