import { Routes } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CompareDatesComponent } from './pages/compare-dates/compare-dates.component';
import { HomeComponent } from './pages/home/home.component';
import { LogsComponent } from './pages/logs/logs.component';
import { InitialDateComponent } from './pages/initial-date/initial-date.component';

export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'compare-dates',
        component: CompareDatesComponent,
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: 'initial-date',
        component: InitialDateComponent,
      },
    ],
  },
];
