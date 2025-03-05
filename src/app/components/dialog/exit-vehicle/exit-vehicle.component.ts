import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { exitTimeValidator } from '../../../validators/exit-time.validator';

@Component({
  selector: 'app-exit-vehicle',
  imports: [ReactiveFormsModule, MatButton, MatFormField, MatInputModule],
  templateUrl: './exit-vehicle.component.html',
  styleUrl: './exit-vehicle.component.scss',
})
export class ExitVehicleComponent {
  exitTimeForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ExitVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.exitTimeForm = new FormGroup({
      exitTime: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          exitTimeValidator(this.data.entryTime), // Validador personalizado
        ])
      ),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmExit(): void {
    if (this.exitTimeForm.valid) {
      this.dialogRef.close(this.exitTimeForm.value.exitTime);
    }
  }
}
