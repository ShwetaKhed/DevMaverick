import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ExplorationComponent } from './exploration/exploration.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { SuburbDetailsComponent } from './suburb-details/suburb-details.component';
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
import { AboutComponent } from './about/about.component';
import { ChartComponent } from './chart/chart.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadComponent } from './load/load.component';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ExplorationComponent,
    RecommendationComponent,
    SuburbDetailsComponent,
    AboutComponent,
    ChartComponent,
    LoadComponent,
    MapComponent
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
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
