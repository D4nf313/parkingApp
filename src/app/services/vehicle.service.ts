import { Injectable } from '@angular/core';
import {
  ParkingSpot,
  Vehicle,
} from '../components/vehicle-form/vehicle-form.interface';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly storageKey = 'vehicleData';

  constructor() {}

  saveVehicle(vehicle: Vehicle): Observable<{ status: number }> {
    const vehicles = this.getVehicles();
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
    console.log(4111)
    let vehicles = this.getVehicles();
    const index = vehicles.findIndex(
      (v) => v.licensePlate === updatedVehicle.licensePlate
    );
console.log(index)
    if (index !== -1) {
      vehicles[index] = updatedVehicle; // Sobreescribe el vehículo con los nuevos datos
      console.log(vehicles)
      console.log(updatedVehicle)
      sessionStorage.setItem(this.storageKey, JSON.stringify(vehicles));
      return of({ status: 200 }).pipe(delay(1000));
    }
    console.log(vehicles);
    return of({ status: 404 }).pipe(delay(1000)); // Retorna un error si no encuentra el vehículo
  }

  getVehicleData(licensePlate: string): Vehicle | null {
    const vehicles = this.getVehicles();
    return vehicles.find((v) => v.licensePlate === licensePlate) || null;
  }
}
