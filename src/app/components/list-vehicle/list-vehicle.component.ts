import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; // Importa MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Opcional: para paginación
import { MatSortModule } from '@angular/material/sort'; // Opcional: para ordenar
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../vehicle-form/vehicle-form.interface';
import { MatButtonModule } from '@angular/material/button';
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

  constructor(private vehicleService: VehicleService) {}

  
  ngOnInit(): void {
    this.dataSource = this.vehicleService.getVehicles();
  }

  darSalida(vehicle: Vehicle): void {
    // Lógica para dar salida (puede actualizar exitTime con la hora actual)
    vehicle.exitTime = new Date().toLocaleTimeString(); 
  }
}
