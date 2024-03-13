import { Routes } from '@angular/router';
import { HomeContainerComponent } from './home-container/home-container.component';
import { ViewAccidentsContainerComponent } from './view-accidents-container/view-accidents-container.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeContainerComponent,
  },
  {
    path: 'reporting',
    component: HomeContainerComponent,
  },
  {
    path:'viewaccidents',
    component: ViewAccidentsContainerComponent
  }
];
