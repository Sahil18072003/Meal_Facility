import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit {
  addbookingForm!: FormGroup;
  isFormVisible = true;

  constructor(
    private fb: FormBuilder,
    private book: BookService,
    public dialogRef: MatDialogRef<AddBookingComponent>
  ) {}

  ngOnInit(): void {
    this.addbookingForm = this.fb.group({
      BookingType: ['', Validators.required],
      admDateRange: this.fb.group(
        {
          startDate: [new Date(), Validators.required],
          endDate: [new Date(), Validators.required],
        },
        { validators: this.dateRangeValidator }
      ),
    });
  }

  closeForm() {
    this.dialogRef.close();
  }

  bookMeal(): void {
    console.log(this.addbookingForm);
    const jwtToken = localStorage.getItem('token');
    const empIdfromLocal: any = localStorage.getItem('Empid');
    const empid: number = empIdfromLocal as number;

    if (jwtToken) {
      this.book.addBooking(this.addbookingForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.addbookingForm.reset();
          this.closeForm();
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    }
  }

  dateRangeValidator(control: FormGroup): { [key: string]: boolean } | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
    if (startDate && endDate && startDate >= endDate) {
      return { invalidRange: true };
    }
    return null;
  }

  hasMatStartDateError(): boolean {
    const startDateControl = this.addbookingForm
      .get('admDateRange')
      ?.get('startDate');
    return (
      !!startDateControl && startDateControl.hasError('matStartDateInvalid')
    );
  }

  hasMatEndDateError(): boolean {
    const endDateControl = this.addbookingForm
      .get('admDateRange')
      ?.get('endDate');
    return !!endDateControl && endDateControl.hasError('matEndDateInvalid');
  }
}
