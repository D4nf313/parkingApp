import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('./components/dashboard/dashboard.component').then(
          (m) => m.DashboardComponent
        ),
    },
    {
      path: 'vehicles',
      loadComponent: () =>
        import('./components/list-vehicle/list-vehicle.component').then(
          (m) => m.ListVehicleComponent
        ),
    },

    {
      path: '**',
      redirectTo: '',
    },
  ];