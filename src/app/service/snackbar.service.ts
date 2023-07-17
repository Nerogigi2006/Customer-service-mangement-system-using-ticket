import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccessMessage(message: string) {
    const config: MatSnackBarConfig = {
      panelClass: ['success-snackbar'],
      duration: 4000,
      verticalPosition: 'top' // Set the vertical position to 'top'
    };
    this.snackBar.open(message, 'Close', config);
  }

  showErrorMessage(message: string) {
    const config: MatSnackBarConfig = {
      panelClass: ['error-snackbar'],
      duration: 4000,
      verticalPosition: 'top' // Set the vertical position to 'top'
    };
    this.snackBar.open(message, 'Close', config);
  }
}
