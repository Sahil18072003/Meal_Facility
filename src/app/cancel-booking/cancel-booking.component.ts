import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css'],
})
export class CancelBookingComponent implements OnInit {
  selectedDate: Date;
  user: any;
  cancelForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.selectedDate = data.selectedDate;
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.cancelForm = this.fb.group({
      BookingType: ['lunch', Validators.required],
    });
  }

  cancelBooking(): void {
    if (this.cancelForm.invalid) {
      return;
    }

    const mealType = this.cancelForm.value.BookingType;

    let cancelObj = {
      userId: this.user.id,
      bookingType: mealType,
      date: this.selectedDate,
    };

    if (this.selectedDate && this.user?.id) {
      this.bookService.cancelBooking(cancelObj).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });

          this.dialogRef.close({ cancelled: true });
        },
        error: (err: any) => {
          this.snackBar.open(err, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
