import { Injectable } from '@angular/core';
import { Vehicle } from '../components/vehicle-form/vehicle-form.interface';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly storageKey = 'vehicleData';
  constructor() {}

  // Método para guardar un vehículo en sessionStorage
  saveVehicle(vehicle: Vehicle): Observable<{ status: number }> {
    // Obtener los datos actuales de sessionStorage
    const vehicles = this.getVehicles();

    // Agregar el nuevo vehículo al array
    vehicles.push(vehicle);

    // Guardar el array actualizado en sessionStorage
    sessionStorage.setItem(this.storageKey, JSON.stringify(vehicles));

    // Simular una respuesta HTTP exitosa con un retraso de 1 segundo
    return of({ status: 200 }).pipe(delay(1000));
  }
  // Método para obtener todos los vehículos guardados en sessionStorage
  getVehicles(): Vehicle[] {
    const data = sessionStorage.getItem(this.storageKey);

    if (!data) {
      return [];
    }

    // Convertir los datos de JSON a un array de objetos VehicleForm
    return JSON.parse(data) as Vehicle[];
  }
}
