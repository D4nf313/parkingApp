import { Component, Inject, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invoice-one',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './invoice-one.component.html',
  styleUrl: './invoice-one.component.scss',
})
export class InvoiceOneComponent  {
  valor: any = 0;
  placa = '';
  tipoVehiculo = '';
  descuentoAplicado = false;
  constructor(
    private invoiceService: InvoiceService,
    public dialogRef: MatDialogRef<InvoiceOneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.placa = this.data.licensePlate;
    this.calculaPago();
    
  }
  
  calculaPago() {
    const resultado = this.invoiceService.calcularTarifa(this.data.licensePlate);
    this.valor = resultado.valor;
    this.tipoVehiculo = resultado.tipoVehiculo;
    this.descuentoAplicado = resultado.descuentoAplicado;
  }
}
