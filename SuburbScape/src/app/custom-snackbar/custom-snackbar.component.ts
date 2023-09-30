import { Component, Input } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css']
})
export class CustomSnackbarComponent {

  message ="sdkjfndsjfn";
  @Input() action1Label: string | undefined;
  @Input() action2Label: string | undefined;

  constructor(public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>) { }

  onAction1Click(): void {
    this.snackBarRef.dismissWithAction();
  }

  onAction2Click(): void {
    this.snackBarRef.dismissWithAction();
  }
}
