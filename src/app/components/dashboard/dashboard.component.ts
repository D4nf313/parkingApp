import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import { ParkingService } from '../../services/parking.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, RouterModule, MatSnackBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  disponibles!: number;
  ocupados!: number;
  bandReporte: boolean = false;
  totalAmount:number=0;
  constructor(
    public dialog: MatDialog,
    private parkingService: ParkingService,
    private snackBar: MatSnackBar,
    private invoiceService:InvoiceService
  ) {}

  ngOnInit() {
    this.getSummary();
  }

  getSummary() {
    const summary = this.parkingService.getParkingSummary();
    this.ocupados = summary.occupied;
    this.disponibles = summary.available;
  }

  register(): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '1200px',
      height: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getSummary();
      } 
    });
  }

  reporte() {
    this.bandReporte = true;
    const summary = this.parkingService.getParkingSummary();
    if (summary.occupied > 0) {
      this.snackBar.open('Necesita sacar todos los vehiculos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    } else {
      const informes = this.invoiceService.getInforme();

      // Sumar todos los valores de amountToPay
      this.totalAmount = informes.reduce((sum, informe) => sum + informe.amountToPay, 0);
    }
  }
}
