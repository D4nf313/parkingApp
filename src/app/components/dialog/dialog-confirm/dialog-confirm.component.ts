import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss',
})
export class DialogConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Devuelve "false" si el usuario elige "No"
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Devuelve "true" si el usuario elige "Sí"
  }
}
