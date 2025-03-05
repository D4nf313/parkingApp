import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function exitTimeValidator(entryTime: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const exitTime = control.value;

    if (!exitTime || !entryTime) {
      return null; // No hay error si no hay valores
    }

    // Convertir las horas a minutos para comparar
    const entryMinutes = convertTimeToMinutes(entryTime);
    const exitMinutes = convertTimeToMinutes(exitTime);

    // Validar que la hora de salida sea posterior a la de entrada
    if (exitMinutes <= entryMinutes) {
      return { invalidExitTime: true }; // Error si la hora de salida no es válida
    }

    return null; // No hay error
  };
}

// Función auxiliar para convertir HH:MM a minutos
function convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}