import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParkingSpot, Vehicle } from '../vehicle-form.interface';
import { VehicleService } from '../../services/vehicle.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ParkingService } from '../../services/parking.service';
@Component({
  selector: 'app-vehicle-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent implements OnInit {
  vehiculoForm!: FormGroup;
  vehicle?: Vehicle;
  isPlazaDisabled = true;
  isEdit: boolean = false;
  idVehicle?: number | null;
  spotOccuped?: any;
  tiposVehiculo = [
    { id: 1, label: 'Carro' },
    { id: 2, label: 'Moto' },
  ];

  tiposAlimentacion = [
    { id: 1, label: 'Eléctrico' },
    { id: 2, label: 'Híbrido' },
    { id: 3, label: 'Combustible' },
  ];

  plazas: ParkingSpot[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VehicleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle },
    private vehicleService: VehicleService,
    private parkingService: ParkingService,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.idVehicle = data.vehicle?.id;
      this.isEdit = true;
      this.SpotForType(this.data.vehicle.vehicleType);
      this.spotOccuped = this.data.vehicle.assignedSpot;
    }

    this.vehiculoForm = this.fb.group({
      placa: [
        data?.vehicle?.licensePlate || '',
        [Validators.required, Validators.pattern(/^[A-Za-z]{3}-\d{3}$/)],
      ],
      nombreDueño: [data?.vehicle?.ownerName || '', Validators.required],
      cedula: [data?.vehicle?.idNumber || '', [Validators.required]],
      correo: [
        data?.vehicle?.email || '',
        [Validators.required, Validators.email],
      ],
      telefono: [
        data?.vehicle?.phone || '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      tipoVehiculo: [data?.vehicle?.vehicleType || '', Validators.required],
      plaza: [data?.vehicle?.assignedSpot || '', Validators.required],
      tipoAlimentacion: [data?.vehicle?.fuelType || '', Validators.required],
      horaEntrada: [data?.vehicle?.entryTime || '', Validators.required],
    });
  }
  ngOnInit(): void {
    this.vehiculoForm.get('tipoVehiculo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.isPlazaDisabled = false;
        this.SpotForType(value);
      } else {
        this.isPlazaDisabled = true;
      }
    });
  }

  SpotForType(id: number): void {
    const tipoSeleccionado = id;
    if (tipoSeleccionado === 1) {
      this.parkingService.getParkingSpotsCar().subscribe((spots) => {
        this.plazas = spots;
      });
    } else if (tipoSeleccionado === 2) {
      this.parkingService.getParkingSpotsMoto().subscribe((spots) => {
        this.plazas = spots;
      });
    }
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.vehiculoForm.valid) {
      const dataSend: Vehicle = {
        id: this.idVehicle ?? null,
        licensePlate: this.vehiculoForm.get('placa')?.value,
        ownerName: this.vehiculoForm.get('nombreDueño')?.value,
        idNumber: this.vehiculoForm.get('cedula')?.value,
        email: this.vehiculoForm.get('correo')?.value,
        phone: this.vehiculoForm.get('telefono')?.value,
        vehicleType: this.vehiculoForm.get('tipoVehiculo')?.value,
        fuelType: this.vehiculoForm.get('tipoAlimentacion')?.value,
        assignedSpot: this.vehiculoForm.get('plaza')?.value,
        entryTime: this.vehiculoForm.get('horaEntrada')?.value,
        exitTime: null,
      };
      console.log(dataSend);
      if (!this.isEdit) {
        this.vehicleService.saveVehicle(dataSend).subscribe({
          next: () => {
            const idTipo = this.vehiculoForm.get('tipoVehiculo')?.value;
            const idSpot = this.vehiculoForm.get('plaza')?.value;

            this.parkingService.updateParkingSpot(idTipo, idSpot);

            this.dialogRef.close(true);

            this.snackBar.open('Vehículo guardado con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          error: (err) => {
            console.error('Error al guardar el vehículo:', err);
            alert('Error al guardar el vehículo');
          },
        });
      } else {
        //Edit
        this.vehicleService.updateVehicle(dataSend).subscribe({
          next: () => {
            const idTipo = this.vehiculoForm.get('tipoVehiculo')?.value;
            const idSpot = this.vehiculoForm.get('plaza')?.value;
            console.log(this.spotOccuped, idSpot);
            if (this.spotOccuped !== idSpot) {
              console.log('edittt');
              this.parkingService.updateParkingSpot(idTipo, this.spotOccuped);
              this.parkingService.updateParkingSpot(idTipo, idSpot);
            }

            console.log(idTipo, idSpot);

            this.dialogRef.close(true);

            this.snackBar.open('Vehículo editado con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          error: (err) => {
            console.error('Error al guardar el vehículo:', err);
            alert('Error al guardar el vehículo');
          },
        });
      }
    }
  }
}
