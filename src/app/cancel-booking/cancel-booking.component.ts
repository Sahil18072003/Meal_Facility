import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css'],
})
export class CancelBookingComponent implements OnInit {
  selectedDate: Date | null = null;
  user: any; 

  constructor(
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    private book: BookService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onSelect(event: Date): void {
    this.selectedDate = event;
  }

  cancelBooking() {
    if (this.selectedDate && this.user?.id) {
      const formattedDate = this.selectedDate.toISOString().split('T')[0];
      const cancelBookingObj = {
        userId: this.user.id,
        date: formattedDate,
      };

      this.book.cancelBooking(cancelBookingObj).subscribe({
        next: (res: any) => {
          // Adjusted type of 'res' to 'any'
          console.log(res);

          this.snackBar.open(res.message, 'Okay', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });

          this.closeForm();
        },
        error: (err: any) => {
          // Adjusted type of 'err' to 'any'
          console.log(err);
          this.snackBar.open(err, 'Try again', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      this.snackBar.open('Your form is invalid', 'Try again', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
      });
    }
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
