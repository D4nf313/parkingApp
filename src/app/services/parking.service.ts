import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ParkingSpot } from '../components/vehicle-form/vehicle-form.interface';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
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
    this.loadParkingData();
  }

  private loadParkingData(): void {
    const carData = sessionStorage.getItem(this.parkingCarKey);
    if (carData) this.parkingCar = JSON.parse(carData);

    const motoData = sessionStorage.getItem(this.parkingMotoKey);
    if (motoData) this.parkingMoto = JSON.parse(motoData);
  }

   saveParkingData(): void {
      sessionStorage.setItem(this.parkingCarKey, JSON.stringify(this.parkingCar));
      sessionStorage.setItem(this.parkingMotoKey, JSON.stringify(this.parkingMoto));
    }
  
  
    updateParkingSpot(idTipo: number, idSpot: string): void {
      if (idTipo === 1) {
        // Buscar el puesto en el array de carros
        const spot = this.parkingCar.find(s => s.id === idSpot);
        if (spot) {
          spot.occupied = !spot.occupied; // Cambiar estado
        }
      } else if (idTipo === 2) {
        // Buscar el puesto en el array de motos
        const spot = this.parkingMoto.find(s => s.id === idSpot);
        if (spot) {
          spot.occupied = !spot.occupied; // Cambiar estado
        }
      }
      // Guardar los cambios en sessionStorage
      this.saveParkingData();
    }
  
    getParkingSpotsCar(): Observable<ParkingSpot[]> {
      return of(this.parkingCar);
    }
  
     
    getParkingSpotsMoto(): Observable<ParkingSpot[]> {
      return of(this.parkingMoto);
    }
  
}
