import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suburbscape',
  templateUrl: './suburbscape.component.html',
  styleUrls: ['./suburbscape.component.css']
})
export class SuburbscapeComponent {

  constructor( private router: Router) {
  }

  explore(){
    this.router.navigate(['explore']);
  }

}
