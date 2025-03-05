import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
@Component({
  selector: 'app-dashboard',
  imports: [    MatButtonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public dialog: MatDialog) {}


  register(): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '1200px',
      height: '450px',

    });

    // Escucha cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró', result);
    });
  }
}
