import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  message = this.sharedService.message;

  constructor(
    private sharedService: SharedService) {
      console.log(this.message);
    }
}
