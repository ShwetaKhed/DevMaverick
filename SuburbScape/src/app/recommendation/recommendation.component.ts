import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Suburb } from '../models/suburb.model';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {

  constructor(private sharedService: SharedService) { }


  items: Suburb[] = [];
  expandedIndex = 0;

  ngOnInit(): void {
    for (var i = 0; i < this.sharedService.suburbList.length; i++)
    {
      this.items.push(this.sharedService.suburbList[i]);
    }
  }

}
