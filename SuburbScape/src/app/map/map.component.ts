import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: any;

  constructor(private http: HttpClient, private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Leaflet map view
    this.map = L.map('leafletMap').setView([-36, 144.9631], 6.4);

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
      L.geoJSON(geojsonData, {
        style: function(feature) {
          if (feature && feature.properties) {
            const region = feature.properties.Region;
            const fillColor = regionColors[region] || 'gray';

            return {
              fillColor: fillColor,
              weight: 1,
              opacity: 1,
              color: 'black',
              fillOpacity: 0.7
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

  }
}
