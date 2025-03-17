import { Injectable } from '@angular/core';
import { ParkingSpot, Vehicle } from '../components/vehicle-form.interface';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly storageKey = 'vehicleData';

  constructor() {}

  saveVehicle(vehicle: Vehicle): Observable<{ status: number }> {
    const vehicles = this.getVehicles();
    vehicle.id = vehicle.id || new Date().getTime();

    vehicles.push(vehicle);
    sessionStorage.setItem(this.storageKey, JSON.stringify(vehicles));
    return of({ status: 200 }).pipe(delay(1000));
  }
  getVehicles(): Vehicle[] {
    const data = sessionStorage.getItem(this.storageKey);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as Vehicle[];
  }

  updateVehicle(updatedVehicle: Vehicle): Observable<{ status: number }> {
    let vehicles = this.getVehicles();
    const index = vehicles.findIndex((v) => v.id === updatedVehicle.id);
    if (index !== -1) {
      vehicles[index] = updatedVehicle; // Sobreescribe el vehículo con los nuevos datos
      sessionStorage.setItem(this.storageKey, JSON.stringify(vehicles));
      return of({ status: 200 }).pipe(delay(1000));
    }
    return of({ status: 404 }).pipe(delay(1000)); // Retorna un error si no encuentra el vehículo
  }

  getVehicleData(licensePlate: string): Vehicle | null {
    const vehicles = this.getVehicles();
    return vehicles.find((v) => v.licensePlate === licensePlate) || null;
  }

  delete(id: number): Observable<{ status: number }> {
    let vehicles = this.getVehicles();
    const index = vehicles.findIndex((v) => v.id === id);

    if (index !== -1) {
      vehicles.splice(index, 1); // Elimina el vehículo del array
      sessionStorage.setItem(this.storageKey, JSON.stringify(vehicles));
      return of({ status: 200 }).pipe(delay(1000)); // Simula respuesta del backend
    }

    return of({ status: 404 }).pipe(delay(1000)); // Si no se encuentra, retorna error
  }
}
