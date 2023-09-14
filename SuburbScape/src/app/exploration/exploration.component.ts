import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Suburb } from '../models/suburb.model';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import Chart from 'chart.js/auto';
import { employment } from '../models/employment.model';
import { community } from '../models/community.model';



@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})


export class ExplorationComponent implements AfterViewInit {
  minRent = 0;
  maxRent = 0;
  suburbList: Suburb[] = [];
  map: any;
  geojsonData: any;
  public chart: any;
  checked: Boolean = false;
  checked2: Boolean = false;
  checked3: Boolean = false;
  checked4: Boolean = false;
  preselectedSuburb: Suburb[] = [];
  suburb_list = [
    { value: '', label: '' }
  ];
  suburb: string = '';
  desc: string = "";
  crime = 0;
  rent = 0;
  managers = 0
  step = 0;
  employmentList: employment[] = [];
  communityList: community[] = [];
  data: number[] = [];
  distance = 0;
  time = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

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
      this.http.get<any>('https://dev04backend.azurewebsites.net/api/data').subscribe((response) => {
        this.suburbList = response;
        });
        this.http.get<any>('https://dev04backend.azurewebsites.net/api/emp_data').subscribe((resp) => {
          this.employmentList = resp;
        });
        this.http.get<any>('https://dev04backend.azurewebsites.net/api/pro_data').subscribe((response1) => {
          this.communityList = response1;
        });
      }
  search(){

    this.preselectedSuburb =  this.sharedService.selectedSuburb;
    this.sharedService.selectedSuburb = [];

   if(this.minRent == 0 || this.maxRent == 0){
    this.showSnackbar("Please select min and max rent");
    return;
   }
   this.map.remove();

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
   //this.router.navigate(['/recommend']);

   this.updateMap(false);
   this.checked3 = true;
   this.suburb_list.pop();
   this.suburb_list = [];
   for (var i = 0; i< this.sharedService.selectedSuburb.length; i++){
     this.suburb_list.push( { value: this.sharedService.selectedSuburb[i].LGA,
       label: this.sharedService.selectedSuburb[i].LGA })
   }
   const yOffset = window.scrollY;
    window.scrollTo({
      top: yOffset + 300,
      behavior: "smooth"
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



  updateMap(flag:boolean){
    this.map = L.map('leafletMap').setView([-37.471310, 144.785156], 6.5);
     // Basic Layer
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
    const regionColors: { [key: string]: string } = {};

    if (!flag){
    if (this.sharedService.selectedSuburb.length < 48)
    {
    for (var i =0; i < this.sharedService.selectedSuburb.length; i++)
    {
      regionColors[this.sharedService.selectedSuburb[i].LGA.toUpperCase()] = 'blue';
    }
  }
  } else{
    regionColors[this.suburb.toUpperCase()] = 'red';
  }

    L.geoJSON(this.geojsonData, {
      style: function(feature) {
        if (feature && feature.properties) {
          const region = feature.properties.Region;
          const lga = feature.properties.LGA;
          const fillColor = regionColors[lga] || 'transparent';
          return {
            fillColor: fillColor,
            weight: 1,
            opacity: 1,
            color: 'grey',
            fillOpacity: 0.3
          };
        }
        return {};
      },

      onEachFeature: function(feature, layer) {
        if (feature && feature.properties && feature.properties.LGA && feature.properties['Weekly Median Rent']) {
          const rent = parseInt(feature.properties['Weekly Median Rent']);
          if (!isNaN(rent) && rent >= 200 && rent <= 600) { // 租金在 200 到 600 之间
            layer.bindTooltip('LGA: ' + feature.properties.LGA + '<br>Weekly Median Rent: ' + feature.properties['Weekly Median Rent']);
          }
        }
      }
    }).addTo(this.map);

  }
  ngAfterViewInit() {
    // Leaflet map view
    this.map = L.map('leafletMap').setView([-37.471310, 144.785156], 6.5);


    // Basic Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // Colors for different regions
    const regionColors: { [key: string]: string } = {
      'Barwon South West': 'red',
      'Grampians': 'blue',
      'Hume': 'green',
      'Gippsland': 'orange',
      'Loddon Mallee': 'purple',
    };

    // json data
    this.http.get<any>('assets/regional_vic.json').subscribe(geojsonData => {
      this.geojsonData = geojsonData;
      L.geoJSON(geojsonData, {
        style: function(feature) {
          if (feature && feature.properties) {
            const region = feature.properties.Region;
            const fillColor = regionColors[region] || 'gray';
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
          if (feature && feature.properties && feature.properties.LGA && feature.properties['Weekly Median Rent']) {
            const rent = parseInt(feature.properties['Weekly Median Rent']);
            if (!isNaN(rent) && rent >= 200 && rent <= 600) { // 租金在 200 到 600 之间
              layer.bindTooltip('LGA: ' + feature.properties.LGA + '<br>Weekly Median Rent: ' + feature.properties['Weekly Median Rent']);
            }
          }
        }
      }).addTo(this.map);

    });
    this.map.on("click", () => {
    });
  }

  radioButtonChange(event: any) {
    // Handle the radio button selection change event here
    if(event.value == "1"){
      this.checked = true;
    }
    else{
      this.checked = false;
      this.checked2 = true;
    }
  }

  onOptionSelectedSuburb(event: any) {
    this.map.remove();
    this.updateMap(true);
    const yOffset = window.scrollY;
    window.scrollTo({
      top: yOffset + 400,
      behavior: "smooth"
    });
    if (this.chart != undefined)
    {
      this.chart.destroy();
    }

    this.checked4 = true;
    for (var i = 0; i< this.sharedService.selectedSuburb.length; i++){
      if (event.value == this.sharedService.selectedSuburb[i].LGA)
      {
          this.desc = this.sharedService.selectedSuburb[i].Description;
          this.crime = this.sharedService.selectedSuburb[i].Rate_per_100000_population
          this.rent = this.sharedService.selectedSuburb[i].Median
      }
    }
    for (var i = 0; i< this.communityList.length; i++){
      if (event.value == this.communityList[i].LGA)
      {
          this.distance = this.communityList[i].Distance;
          this.time = this.communityList[i].Travel_Time;
      }

    }
    for (var i = 0; i< this.employmentList.length; i++){
      if (event.value == this.employmentList[i].LGA)
      {
        this.data.push(this.employmentList[i].Managers);
        this.data.push(this.employmentList[i].Professionals);
        this.data.push(this.employmentList[i].Clerical_and_administrative_workers);
        this.data.push(this.employmentList[i].Community_and_personal_service_workers);
        this.data.push(this.employmentList[i].Labourers);
        this.data.push(this.employmentList[i].Machinery_operators_and_drivers);
        this.data.push(this.employmentList[i].Sales_workers);
        this.data.push(this.employmentList[i].Technicians_trades_workers);
      }
    }

    this.chart = new Chart("Chartx", {
      type: 'bar',
      options: {
        aspectRatio:2,
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
        labels: ["Managers", "Professionals", "Clerical/administrative",
      "Community/personal service", "Labourers", "Machinery operators/drivers",
    "Sales", "Technicians/Traders"],
	       datasets: [
          {
            label: "Employment Opportunities in percentage",
            data: this.data,
            backgroundColor: "#d35400"
          }
        ]
      }

    });


  }

}


