import { Component, Inject } from '@angular/core';
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

@Component({
  selector: 'app-vehicle-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule, // Módulo para mat-form-field y mat-input
    MatSelectModule, // Módulo para mat-select
    MatFormFieldModule, // Módulo para mat-form-field
    MatButtonModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent {
  vehiculoForm!: FormGroup;

  tiposVehiculo = [
    { value: 'carro', label: 'Carro' },
    { value: 'moto', label: 'Moto' },
  ];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<VehicleFormComponent> ,  @Inject(MAT_DIALOG_DATA) public data: any ) {
    // Inicializa el formulario con FormBuilder
    this.vehiculoForm = this.fb.group({
      placa: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z]{3}-\d{3}$/)],
      ], // Placa con formato ABC-123
      nombreDueño: ['', Validators.required], // Nombre del dueño
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Cédula de 10 dígitos
      correo: ['', [Validators.required, Validators.email]], // Correo electrónico válido
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Teléfono de 10 dígitos
      tipoVehiculo: ['', Validators.required], // Tipo de vehículo (select)
    });
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.vehiculoForm.valid) {
      console.log('Formulario enviado:', this.vehiculoForm.value);
      // Aquí puedes enviar los datos a un servicio o API
    } else {
      console.log('Formulario inválido');
    }
  }
}
