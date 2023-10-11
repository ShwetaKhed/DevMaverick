import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ExplorationComponent } from './exploration/exploration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadComponent } from './load/load.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { RecommendComponent } from './recommend/recommend.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';


import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { DialogComponent } from './dialog/dialog.component';
import { SuburbscapeComponent } from './suburbscape/suburbscape.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ExplorationComponent,
    LoadComponent,
    RecommendComponent,
    CustomSnackbarComponent,
    DialogComponent,
    SuburbscapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgbModule,
    NgbCarouselModule,
    CdkAccordionModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


