import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {
  }

  about() {
    this.router.navigate(['/about']);
  }

  home() {
    this.router.navigate(['/home']);
  }

  explore(){
    this.router.navigate(['explore']);
  }

  why(){
    this.router.navigate(['why']);
  }

}
