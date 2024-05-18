import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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

  campaignOne = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  campaignTwo = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  constructor(
    private fb: FormBuilder,
    private book: BookService,
    public dialogRef: MatDialogRef<AddBookingComponent>
  ) {}

  ngOnInit(): void {
    this.addbookingForm = this.fb.group({
      BookingType: new FormControl('', [Validators.required]),
      BookingStartDate: new FormControl('', [Validators.required]),
      BookingEndDate: new FormControl('', [Validators.required]),
    });
  }

  closeForm() {
    this.dialogRef.close();
  }

  get bookingTypeValidator() {
    return this.addbookingForm.get('BookingType');
  }

  get bookingStartDateValidator() {
    return this.addbookingForm.get('BookingStartDate');
  }
  get bookingEndDateValidator() {
    return this.addbookingForm.get('BookingEndDate');
  }

  bookMeal(): void {
    var startDate = this.addbookingForm.value['BookingStartDate'] as string;
    var EndDate = this.addbookingForm.value['BookingEndDate'] as string;
    let MealType = this.addbookingForm.value['BookingType'] as string;
    // debugger;
    const jwtToken = localStorage.getItem('token');
    const empIdfromLocal: any = localStorage.getItem('Empid');
    const empid: number = empIdfromLocal as number;

    if (jwtToken) {
      console.log(this.addbookingForm.value);
      this.book.addBooking(this.addbookingForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.addbookingForm.reset();
          // this.toast.success(res.message, 'success');
          // this.toast.success({
          //   detail: 'success',
          //   summary: res.message,
          //   duration: 3000,
          // });
          this.closeForm();
        },
        error: (err) => {
          alert(err?.error.message);
          // this.toast.error(err?.error.message);
          // this.toast.error({
          //   detail: 'error',
          //   summary: err?.error.message,
          //   duration: 3000,
          // });
        },
      });
    }
  }
}
