import { Injectable } from '@angular/core';
import { ParkingSpot, Vehicle } from '../components/vehicle-form/vehicle-form.interface';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly storageKey = 'vehicleData';
  private readonly parkingCarKey = 'parkingCar';
  private readonly parkingMotoKey = 'parkingMoto';
  private parkingCar: ParkingSpot[] = [
    { id: 'C1', occupied: false },
    { id: 'C2', occupied: false },
    { id: 'C3', occupied: false },
    { id: 'C4', occupied: false },
    { id: 'C5', occupied: false }
  ];

  private parkingMoto: ParkingSpot[] = [
    { id: 'M1', occupied: false },
    { id: 'M2', occupied: false },
    { id: 'M3', occupied: false },
    { id: 'M4', occupied: false },
    { id: 'M5', occupied: false },
    { id: 'M6', occupied: false }
  ];
  constructor() {

  }


 
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
}
