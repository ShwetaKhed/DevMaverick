import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExplorationComponent } from './exploration/exploration.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { AboutComponent } from './about/about.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'explore',
    component: ExplorationComponent
  },
  {
    path: 'recommend',
    component: RecommendationComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
