import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookService } from '../services/book.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-quick-booking',
  templateUrl: './quick-booking.component.html',
  styleUrls: ['./quick-booking.component.css'],
})
export class QuickBookingComponent implements OnInit {
  quickbookingForm!: FormGroup;
  user: any;

  isFormVisible = true;

  minDate: Date;
  BookingDate: Date;

  constructor(
    private fb: FormBuilder,
    private book: BookService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<QuickBookingComponent>,
    private authService: AuthService
  ) {
    this.minDate = new Date();
    this.BookingDate = new Date();

    this.quickbookingForm = this.fb.group({
      BookingType: ['', Validators.required],
      BookingDate: ['', Validators.required],
    });
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
    const jwtToken = localStorage.getItem('token');

    if (this.quickbookingForm.valid) {
      const formData = {
        UserId: this.user.id,
        BookingType: this.quickbookingForm.value.BookingType,
        BookingDate: this.quickbookingForm.value.BookingDate,
      };

      this.book.quickBooking(formData).subscribe({
        next: (res) => {
          this.quickbookingForm.reset();

          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });

          this.closeForm();
        },
        error: (err) => {
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

  isAfterEightPM(): boolean {
    const now = new Date();
    return now.getHours() >= 20;
  }
}
