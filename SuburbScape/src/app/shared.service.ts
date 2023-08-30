import { Injectable } from '@angular/core';
import { Suburb } from './models/suburb.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  suburbList: Suburb[] = [];
  selectedSuburb: Suburb[] = [];
  highestRent: number = 0;
  suburbWithHighestRent : String = "";
  highestCrime: number = 0;
  suburbWithHighestCrime : String = "";

  constructor() { }
}
