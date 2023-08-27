import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {

    console.log("const")
  }

  ngOnInit(): void {
    console.log("on init");
  }


  about() {
    this.router.navigate(['/about']);
  }

  home() {
    this.router.navigate(['']);
  }

  explore(){
    this.router.navigate(['explore']);

  }

}
