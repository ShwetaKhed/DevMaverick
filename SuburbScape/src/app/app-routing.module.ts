import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExplorationComponent } from './exploration/exploration.component';
import { LoadComponent } from './load/load.component';
import { RecommendComponent } from './recommend/recommend.component';
import { SuburbscapeComponent } from './suburbscape/suburbscape.component';

const routes: Routes = [
  {
    path: '',
    component: LoadComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'explore',
    component: RecommendComponent
  },
{
  path: 'why',
  component: SuburbscapeComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
