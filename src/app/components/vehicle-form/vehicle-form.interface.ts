export interface Vehicle {
  licensePlate: string; // Placa (formato ABC-123)
  ownerName: string; // Nombre del dueño
  idNumber: string; // Cédula
  email: string; // Correo electrónico
  phone: string; // Teléfono (10 dígitos)
  vehicleType: string; // Tipo de vehículo (select)
  entryTime: string; // Hora de entrada (formato HH:MM)
  exitTime: string | null;
}
