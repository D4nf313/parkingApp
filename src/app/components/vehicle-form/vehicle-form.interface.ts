export interface Vehicle {
  licensePlate: string; // Placa (formato ABC-123)
  ownerName: string; // Nombre del dueño
  idNumber: string; // Cédula
  email: string; // Correo electrónico
  phone: string; // Teléfono (10 dígitos)
  vehicleType: number; // Tipo de vehículo (select)
  fuelType: number; // Tipo de vehículo (select)
  entryTime: string; // Hora de entrada (formato HH:MM)
  exitTime: string | null;
  assignedSpot: string;
}

export interface ParkingSpot {
    id: string; // Identificador del puesto (Ejemplo: "C1" para carros, "M1" para motos)
    occupied: boolean; // Indica si el puesto está ocupado o no
  }
