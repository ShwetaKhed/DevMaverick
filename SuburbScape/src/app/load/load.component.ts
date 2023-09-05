import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent {

  constructor( private router: Router, private snackBar: MatSnackBar) {

  }

  password: any;
  onLogin(): void {
    if (this.password == "DevMaverick"){
      this.snackBar.open('Login successful!', 'Close', {
        duration: 1000,
      });
      this.router.navigate(['/home']);
    }
    else {
      this.snackBar.open('Invalid Password!!', 'Close', {
        duration: 3000,
      });
    }
  }

}
