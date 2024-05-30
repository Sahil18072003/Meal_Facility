import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service'; // Import AuthService to access the getUser method

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit {
  addbookingForm!: FormGroup;
  user: any;

  isFormVisible = true;
  numberOfDays: number | null = null;

  minDate: Date;
  BookingStartDate: Date;
  BookingEndDate: Date;

  constructor(
    private fb: FormBuilder,
    private book: BookService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddBookingComponent>,
    private authService: AuthService
  ) {
    this.minDate = new Date();
    this.BookingStartDate = new Date();
    this.BookingEndDate = new Date();
    this.numberOfDays = 0;

    this.addbookingForm = this.fb.group({
      BookingType: ['', Validators.required],
      BookingStartDate: ['', Validators.required],
      BookingEndDate: ['', Validators.required],
    });

    this.addbookingForm.valueChanges.subscribe((value) => {
      if (value.BookingStartDate && value.BookingEndDate) {
        this.BookingStartDate = new Date(value.BookingStartDate);
        this.BookingEndDate = new Date(value.BookingEndDate);
        this.numberOfDays = this.calculateDaysBetween(
          this.BookingStartDate,
          this.BookingEndDate
        );
      } else {
        this.numberOfDays = null;
      }
    });
  }

  calculateDaysBetween(start: Date, end: Date): number {
    let count = 0;
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        // Skip Sunday (0) and Saturday (6)
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return count;
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  closeForm() {
    this.dialogRef.close();
  }

  bookMeal(): void {
    if (this.addbookingForm.valid) {
      const formData = {
        UserId: this.user.id,
        BookingType: this.addbookingForm.value.BookingType,
        BookingStartDate: this.addbookingForm.value.BookingStartDate,
        BookingEndDate: this.addbookingForm.value.BookingEndDate,
      };

      this.book.bulkBooking(formData).subscribe({
        next: (res) => {
          this.addbookingForm.reset();

          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });

          this.closeForm();
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open(err, 'Try again', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }

  hasMatBookingStartDateError(): boolean {
    const BookingStartDateControl = this.addbookingForm.get('BookingStartDate');
    return (
      !!BookingStartDateControl &&
      BookingStartDateControl.hasError('matBookingStartDateInvalid')
    );
  }

  hasMatBookingEndDateError(): boolean {
    const BookingEndDateControl = this.addbookingForm.get('BookingEndDate');
    return (
      !!BookingEndDateControl &&
      BookingEndDateControl.hasError('matBookingEndDateInvalid')
    );
  }
}
