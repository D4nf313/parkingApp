import { Component, Inject } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { VehicleService } from '../../../services/vehicle.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-one',
  imports: [CommonModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './invoice-one.component.html',
  styleUrl: './invoice-one.component.scss',
})
export class InvoiceOneComponent {
  valor: any = 0;
  placa = '';
  tipoVehiculo = '';
  descuentoAplicado = false;
  constructor(
    private invoiceService: InvoiceService,
    private vehicleService: VehicleService,
    public dialogRef: MatDialogRef<InvoiceOneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.placa = this.data.licensePlate;
    this.calculaPago();
  }

  calculaPago() {
    const resultado = this.invoiceService.calcularTarifa(
      this.data.licensePlate
    );
    this.valor = resultado.valor;
    console.log(this.valor)
    this.tipoVehiculo = resultado.tipoVehiculo;
    this.descuentoAplicado = resultado.descuentoAplicado;
    
    this.actualizarBd();
  }

  actualizarBd() {
    let vehicleExit: any = this.vehicleService.getVehicleData(this.placa);
    vehicleExit.amountToPay = this.valor;
    console.log(vehicleExit)
    this.vehicleService.updateVehicle(vehicleExit).subscribe((response) => {
      if (response.status === 200) {
        this.snackBar.open(
          'Se ha dado salida al vehiculo correctamente',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      } else {
        console.log('Error al actualizar el vehículo');
      }
    });
    console.log(vehicleExit);
  }
}
