import { Routes } from '@angular/router';
import { HomeContainerComponent } from './home-container/home-container.component';
import { ViewAccidentsContainerComponent } from './view-accidents-container/view-accidents-container.component';
import { AccidentReportComponent } from './accident-report-container/accident-report.component';
import { MapDialogComponent } from './view-accidents-container/view-map-detail/mapdialog.component';

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
    component: AccidentReportComponent,
  },
  {
    path:'viewaccidents',
    component: ViewAccidentsContainerComponent
  }
];
