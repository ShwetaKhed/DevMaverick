import { Injectable } from '@angular/core';
import { Suburb } from './models/suburb.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  suburbList: Suburb[] = [];

  constructor() { }
}
