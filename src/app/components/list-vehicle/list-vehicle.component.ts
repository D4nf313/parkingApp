import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; // Importa MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Opcional: para paginación
import { MatSortModule } from '@angular/material/sort'; // Opcional: para ordenar
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../vehicle-form/vehicle-form.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ParkingService } from '../../services/parking.service';
import { ExitVehicleComponent } from '../dialog/exit-vehicle/exit-vehicle.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InvoiceOneComponent } from '../dialog/invoice-one/invoice-one.component';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
@Component({
  selector: 'app-list-vehicle',
  imports: [
    MatTableModule, // Importa MatTableModule
    MatPaginatorModule, // Opcional: para paginación
    MatSortModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './list-vehicle.component.html',
  styleUrl: './list-vehicle.component.scss',
})
export class ListVehicleComponent implements OnInit {
  displayedColumns: string[] = [
    'licensePlate',
    'entryTime',
    'exitTime',
    'spot',
    'actions',
  ];
  dataSource: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    public dialog: MatDialog,
    private parkingService: ParkingService,
  ) {}

  ngOnInit(): void {
    this.dataSource = this.vehicleService.getVehicles();
    console.log(this.dataSource)
  }

  darSalida(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(ExitVehicleComponent, {
      width: '450px',
      data: { entryTime: vehicle.entryTime },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const placa = vehicle.licensePlate;
        const tipo = Number(vehicle.vehicleType);
        const spot = vehicle.assignedSpot;
        this.parkingService.updateParkingSpot(tipo, spot);
        vehicle.exitTime = result;
        vehicle.assignedSpot = '';
        this.vehicleService.updateVehicle(vehicle);
        this.dialog.open(InvoiceOneComponent, {
          width: '450px',
          data: { licensePlate: placa },
        });

        // Actualizar el estado del estacionamiento
      }
    });
  }

  editar(vehicle:Vehicle){
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '1200px',
      height: '650px',
      data: { vehicle } // Envía el objeto vehicle al modal
    });
  }
}
