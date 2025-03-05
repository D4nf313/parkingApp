import { Injectable } from '@angular/core';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly COSTO_MOTO = 62;
  private readonly COSTO_CARRO = 120;
  private readonly DESCUENTO_AMBIENTAL = 0.25;

  constructor(private vehicleService: VehicleService) {}

  calcularTarifa(licensePlate: string): { valor: number | null; tipoVehiculo: string; descuentoAplicado: boolean } {
    console.log(licensePlate)
    const vehicle = this.vehicleService.getVehicleData(licensePlate);
console.log(vehicle)
    if (!vehicle || !vehicle.entryTime || !vehicle.exitTime) {
      console.warn('No se encontraron datos de entrada o salida.');
      return { valor: null, tipoVehiculo: '', descuentoAplicado: false };
    }

    const horasEstacionado = this.calcularHoras(vehicle.entryTime, vehicle.exitTime);

    let tarifaPorHora = vehicle.vehicleType === 2 ? this.COSTO_MOTO : this.COSTO_CARRO;
    let descuentoAplicado = false;

    // Aplicar descuento ambiental si el vehículo es eléctrico (1) o híbrido (2)
    if (vehicle.fuelType === 1 || vehicle.fuelType === 2) {
      tarifaPorHora *= 1 - this.DESCUENTO_AMBIENTAL; // 25% de descuento
      descuentoAplicado = true;
    }

    const valorTotal = tarifaPorHora * horasEstacionado;

    return {
      valor: valorTotal,
      tipoVehiculo: vehicle.fuelType === 1 ? 'Eléctrico' : vehicle.fuelType === 2 ? 'Híbrido' : 'Gasolina',
      descuentoAplicado
    };
}

  

  private calcularHoras(entryTime: string, exitTime: string): number {
    const entrada = this.convertirAHoras(entryTime);
    const salida = this.convertirAHoras(exitTime);

    return Math.max(0, salida - entrada); // Asegura que no sea negativo
  }

  private convertirAHoras(hora: string): number {
    const [horas, minutos] = hora.split(':').map(Number);
    return horas + minutos / 60; // Convierte minutos a fracción de hora
  }
}
