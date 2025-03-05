import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import { ParkingService } from '../../services/parking.service';
@Component({
  selector: 'app-dashboard',
  imports: [    MatButtonModule,RouterModule, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  disponibles!:number;
  ocupados!:number;
  constructor(public dialog: MatDialog,private parkingService:ParkingService) {}

  ngOnInit() {
    const summary = this.parkingService.getParkingSummary();
    this.ocupados=summary.occupied;
    this.disponibles=summary.available;
    console.log(`Plazas Ocupadas: ${summary.occupied}`);
    console.log(`Plazas Disponibles: ${summary.available}`);
  }

  register(): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '1200px',
      height: '650px',

    });

    // Escucha cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró', result);
    });
  }
}
