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
import { ParkingSpot, Vehicle } from './vehicle-form.interface';
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
  isPlazaDisabled = true;
  tiposVehiculo = [
    { id:1, label: 'Carro' },
    { id:2, label: 'Moto' },
  ];

  tiposAlimentacion = [
    { id: 1, label: 'Eléctrico' },
    { id: 2, label: 'Híbrido' },
    { id: 3, label: 'Combustible' }
  ];

  plazas:ParkingSpot[]=[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VehicleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleService: VehicleService,
    private parkingService: ParkingService,
    private snackBar: MatSnackBar
  ) {
    // Inicializa el formulario con FormBuilder
    this.vehiculoForm = this.fb.group({
      placa: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z]{3}-\d{3}$/)],
      ], // Placa con formato ABC-123
      nombreDueño: ['', Validators.required], // Nombre del dueño
      cedula: ['', [Validators.required]], // Cédula de 10 dígitos
      correo: ['', [Validators.required, Validators.email]], // Correo electrónico válido
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Teléfono de 10 dígitos
      tipoVehiculo: ['', Validators.required], 
      plaza: ['', Validators.required], 
      tipoAlimentacion: ['', Validators.required], 
      horaEntrada:['', Validators.required]
    });
  
  }
  ngOnInit(): void {
    this.vehiculoForm.get('tipoVehiculo')?.valueChanges.subscribe(value => {
      if (value) {
        this.isPlazaDisabled = false;
        this.SpotForType(value);
      } else {
        this.isPlazaDisabled = true;
      }
    });
  }

  SpotForType(id:number): void {
    const tipoSeleccionado = id;
    if (tipoSeleccionado === 1) {
      this.parkingService.getParkingSpotsCar().subscribe(spots => {
        this.plazas=spots;
      });
    } else if (tipoSeleccionado === 2) {
      this.parkingService.getParkingSpotsMoto().subscribe(spots => {
        this.plazas=spots;
      });
    }
  }


  // Método para enviar el formulario
  onSubmit() {
    if (this.vehiculoForm.valid) {
      // Crear el objeto que hace match con la interfaz VehicleForm
      const dataSend: Vehicle = {
        licensePlate: this.vehiculoForm.get('placa')?.value, // Mapear placa a licensePlate
        ownerName: this.vehiculoForm.get('nombreDueño')?.value, // Mapear nombreDueño a ownerName
        idNumber: this.vehiculoForm.get('cedula')?.value, // Mapear cedula a idNumber
        email: this.vehiculoForm.get('correo')?.value, // Mapear correo a email
        phone: this.vehiculoForm.get('telefono')?.value, // Mapear telefono a phone
        vehicleType: this.vehiculoForm.get('tipoVehiculo')?.value, 
        assignedSpot: this.vehiculoForm.get('plaza')?.value, 
        entryTime: this.vehiculoForm.get('horaEntrada')?.value,// Mapear tipoVehiculo a vehicleType
        exitTime:null

      };

      this.vehicleService.saveVehicle(dataSend).subscribe({
        next: () => {
          const idTipo= this.vehiculoForm.get('tipoVehiculo')?.value;
          const idSpot= this.vehiculoForm.get('plaza')?.value;
          this.parkingService.updateParkingSpot(idTipo,idSpot);
          this.dialogRef.close();

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

      // Aquí puedes enviar los datos a un servicio o API
      // this.vehicleService.saveVehicle(dataSend);
    } else {
      console.log('Formulario inválido');
    }
  }
}
