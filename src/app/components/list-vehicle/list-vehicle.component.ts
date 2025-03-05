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
@Component({
  selector: 'app-list-vehicle',
  imports: [
    MatTableModule, // Importa MatTableModule
    MatPaginatorModule, // Opcional: para paginación
    MatSortModule,
    MatButtonModule,
  ],
  templateUrl: './list-vehicle.component.html',
  styleUrl: './list-vehicle.component.scss',
})
export class ListVehicleComponent implements OnInit {
  displayedColumns: string[] = ['licensePlate', 'entryTime', 'exitTime', 'spot','actions'];
  dataSource: Vehicle[] = [];

  constructor(private vehicleService: VehicleService, public dialog: MatDialog, private parkingService:ParkingService) {}

  
  ngOnInit(): void {
    this.dataSource = this.vehicleService.getVehicles();
  }

  darSalida(vehicle: Vehicle): void {
    const vehiculo = vehicle;
    const dialogRef = this.dialog.open(ExitVehicleComponent, {
      width: '450px',
      data: { entryTime:vehicle.entryTime }, // Pasamos el vehículo al modal
    });

    vehicle.exitTime = new Date().toLocaleTimeString(); 

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        vehicle.exitTime = result; 
        vehicle.assignedSpot='';
        const tipo = Number(vehicle.vehicleType);
        const spot =vehicle.vehicleType;
        this.vehicleService.updateVehicle(vehicle).subscribe(response => {
          if (response.status === 200) {
            console.log('Vehículo actualizado correctamente');
          } else {
            console.log('Error al actualizar el vehículo');
          }
        });
    
        // Actualizar el estado del estacionamiento
        this.parkingService.updateParkingSpot(tipo, spot);
        
      }
    });
  }
}
