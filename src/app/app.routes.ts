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
      path: 'form-vehicles',
      loadComponent: () =>
        import('./components/vehicle-form/vehicle-form.component').then(
          (m) => m.VehicleFormComponent
        ),
    },
    {
      path: 'list-vehicles',
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