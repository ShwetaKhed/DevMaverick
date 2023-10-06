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
  occ = "";
  map: any;
  geojsonData: any;
  suburbList: Suburb[] = [];
  employmentList: employment[] = [];
  communityList: community[] = [];
  checked: Boolean = false;
  checked1: Boolean = false;
  checked2: Boolean = false;
  checked3: Boolean = false;
  preselectedSuburb: Suburb[] = [];
  public chart: any;
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
  options = [
    { value: '200', label: '$200' },
    { value: '300', label: '$300' },
    { value: '400', label: '$400' },
    { value: '500', label: '$500' }
  ];
  occList = [
    { value: 'Managers', label: 'Manager' },
    { value: 'Professionals', label: 'Professional' },
    { value: 'Clerical_and_administrative_workers', label: 'Clerical/ administrative workers' },
    { value: 'Community_and_personal_service_workers', label: 'Community/ personal service workers' },
    { value: 'Labourers', label: 'Labourers' },
    { value: 'Machinery_operators_and_drivers', label: 'Machinery operators/drivers' },
    { value: 'Sales_workers', label: 'Sales workers' },
    { value: 'Technicians_trades_workers', label: 'Technicians/trades workers' }

  ];
  option1 = [ { value: '', label: '' }];
  suburb_list = [
    { value: '', label: '' }
  ];
  dataDictJobs: string[] = [];


  constructor(private router: Router, private http: HttpClient,
    private sharedService: SharedService, private snackBar: MatSnackBar) {
     this.http.get<any>('https://dev04final.azurewebsites.net/api/data').subscribe((response) => {
       this.suburbList = response;
       });
       this.http.get<any>('https://dev04final.azurewebsites.net/api/emp_data').subscribe((resp) => {
         this.employmentList = resp;
       });
       this.http.get<any>('https://dev04final.azurewebsites.net/api/pro_data').subscribe((response1) => {
         this.communityList = response1;
       });
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
    this.map.remove();
    this.ngAfterViewInit();
    if(event.value == "1"){
      this.checked = true;
      this.checked1 = false;
      this.checked2 = false;
      this.checked3 = false;
    }
    else{
      this.checked = false;
      this.checked1 = true;
      this.checked2 = false;
      this.checked3 = false;
    }
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

  search(){
    this.checked3 = false;
    this.preselectedSuburb =  this.sharedService.selectedSuburb;
    this.sharedService.selectedSuburb = [];

   if(this.minRent == 0 || this.maxRent == 0){
    this.showSnackbar("Please select min and max rent");
    return;
   }
   this.map.remove();

   for (var i = 0; i < this.suburbList.length; i++)
   {
    var median = this.suburbList[i]["Median"];

    if (Number(this.minRent) <= Number(median) && Number(median) <= Number(this.maxRent))
    {
      this.sharedService.selectedSuburb.push(this.suburbList[i]);
    }
   }
   this.updateMap(false);
   this.checked2 = true;
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
          if (!isNaN(rent) && rent >= 200 && rent <= 600) {
            layer.bindTooltip('LGA: ' + feature.properties.LGA + '<br>Weekly Median Rent: ' + feature.properties['Weekly Median Rent']);
          }
        }
      }
    }).addTo(this.map);

  }

  onOptionSelectedSuburb(event: any) {
    this.map.remove();
    this.updateMap(true);
    const yOffset = window.scrollY;
    window.scrollTo({
      top: yOffset + 600,
      behavior: "smooth"
    });
    if (this.chart != undefined)
    {
      this.chart.destroy();
    }

    this.checked3 = true;
    for (var i = 0; i< this.sharedService.selectedSuburb.length; i++){
      if (event.value == this.sharedService.selectedSuburb[i].LGA)
      {
          this.desc = this.sharedService.selectedSuburb[i].Description;
          this.rent = this.sharedService.selectedSuburb[i].Median
      }
    }


    for (var i = 0; i< this.communityList.length; i++){
      if (event.value == this.communityList[i].LGA)
      {
          this.distance = this.communityList[i].Distance;
          this.time = this.communityList[i].Travel_Time;
          this.hospital = this.communityList[i].Number_of_hospitals;
          this.schools = this.communityList[i].Number_of_schools;
          this.nursery =  this.communityList[i].Number_of_kindergartens;
          this.crime = parseInt( this.communityList[i].Total_offences.toString().split('.')[0]);

      }
    }
    const dataDict: Record<string, number> = {};
    for (var i = 0; i< this.employmentList.length; i++){
      if (event.value == this.employmentList[i].LGA)
      {
        dataDict["Managers"] = this.employmentList[i].Managers;
        dataDict["Professionals"] = this.employmentList[i].Professionals;
        dataDict["Clerical/ administrative workers"] =  this.employmentList[i].Clerical_and_administrative_workers;
        dataDict["Community/ personal service workers"] =
        this.employmentList[i].Community_and_personal_service_workers;
        dataDict["Labourers"] =  this.employmentList[i].Labourers;
        dataDict["Machinery operators/ drivers"] = this.employmentList[i].Machinery_operators_and_drivers;
        dataDict["Sales workers"] = this.employmentList[i].Sales_workers;
        dataDict["Technicians/ trades workers"] = this.data.push(this.employmentList[i].Technicians_trades_workers);
      }
    }

    const sortedDataArray = Object.entries(dataDict).sort(([, a], [, b]) => b - a);

    const sortedDataDict: Record<string, number> = {};

    sortedDataArray.forEach(([key, value]) => {
      sortedDataDict[key] = value;
    });


    const topThreeValues = [];
    const topThreeKeys = [];

    for (let i = 0; i < 3; i++) {
      const [key, value] = sortedDataArray[i];
      topThreeValues.push(value);
      topThreeKeys.push(key);
    }

    this.chart = new Chart("Chartx", {
      type: 'bar',
      data: {
        labels: topThreeKeys,
        datasets: [{
          data: topThreeValues,
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

  scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onOccSelected(event: any) {
    this.checked3 = false;
    var occupationList: any[] = [];
    for (var i = 0; i < this.employmentList.length; i++)
    {
      if (event.value == "Managers"){
        if (this.employmentList[i].Managers > 10){
          occupationList.push(this.employmentList[i].LGA);
        }
      } else if (event.value == "Professionals"){
        if (this.employmentList[i].Professionals > 10){
          occupationList.push(this.employmentList[i].LGA);
        }
      } else if (event.value == "Clerical_and_administrative_workers"){
        if (this.employmentList[i].Clerical_and_administrative_workers > 10){
          occupationList.push(this.employmentList[i].LGA);
        }
      }  else if (event.value == "Community_and_personal_service_workers"){
        if (this.employmentList[i].Community_and_personal_service_workers > 10){
          occupationList.push(this.employmentList[i].LGA);
        }
      } else if (event.value == "Labourers"){
        if (this.employmentList[i].Labourers > 10){
          occupationList.push(this.employmentList[i].LGA);
        }
      }  else if (event.value == "Machinery_operators_and_drivers"){
        if (this.employmentList[i].Machinery_operators_and_drivers > 10){
          occupationList.push(this.employmentList[i].LGA);
        }
      }  else if (event.value == "Sales_workers"){
        if (this.employmentList[i].Sales_workers > 10){
          occupationList.push(this.employmentList[i].LGA);
        }
      }  else if (event.value == "Technicians_trades_workers"){
        if (this.employmentList[i].Technicians_trades_workers > 10){
          occupationList.push(this.employmentList[i].LGA);
        }
      }
      this.dataDictJobs  = occupationList;
    }


  }

  searchSuburb(){
   this.sharedService.selectedSuburb = [];

   this.checked2 = true;
   this.checked3 = false;
   this.suburb_list.pop();
   this.suburb_list = [];
   for (var i =0; i <  this.dataDictJobs.length; i++)
   {
    this.suburb_list.push( { value: this.dataDictJobs[i],
    label: this.dataDictJobs[i] });
    for  (var j = 0; j < this.suburbList.length; j++)
    {
      if(this.suburbList[j].LGA == this.dataDictJobs[i])
      {
        this.sharedService.selectedSuburb.push(this.suburbList[j]);
      }
    }
   }


   const yOffset = window.scrollY;
    window.scrollTo({
      top: yOffset + 300,
      behavior: "smooth"
    });
    this.map.remove();
    this.updateMap(false);


  }


}


