export interface Vehicle {
  id?:number | null;
  licensePlate: string; 
  ownerName: string; 
  idNumber: string; 
  email: string; 
  phone: string; 
  vehicleType: number; 
  fuelType: number;
  entryTime: string; 
  exitTime: string | null;
  assignedSpot: string;
  amountToPay?: number;
}

export interface ParkingSpot {
    id: string; // Identificador del puesto (Ejemplo: "C1" para carros, "M1" para motos)
    occupied: boolean;
  }
