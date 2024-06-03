import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css'],
})
export class CancelBookingComponent implements OnInit {
  selectedDate: Date | null = null;
  user: any;
  bookings: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.data.bookings) {
      this.bookings = this.data.bookings;
    }
  }

  onSelect(event: Date | null): void {
    this.selectedDate = event;
  }

  cancelBooking(): void {
    if (this.selectedDate && this.user?.id) {
      const formattedDate = this.selectedDate.toISOString().split('T')[0];
      const cancelBookingObj = {
        userId: this.user.id,
        date: formattedDate,
      };

      this.bookService.cancelBooking(cancelBookingObj).subscribe({
        next: (res: any) => {
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
          console.error(err);
          let errorMessage = 'An error occurred. Please try again.';
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          }
          this.snackBar.open(errorMessage, 'Try again', {
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

  getActiveBookingsCount(): number {
    return this.bookings.filter((b: any) => b.status !== 'Cancelled').length;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return '';
      }

      const booking = this.bookings.find((b: any) => {
        const bookingDate = new Date(b.bookingDate);
        return (
          bookingDate.getDate() === date.getDate() &&
          bookingDate.getMonth() === date.getMonth() &&
          bookingDate.getFullYear() === date.getFullYear()
        );
      });

      if (booking) {
        return booking.status === 'Cancelled' ? 'cancel-date' : 'booking-date';
      }

      return '';
    };
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
}
