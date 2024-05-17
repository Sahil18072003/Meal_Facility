import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css'],
})
export class ViewBookingComponent {
  bookingForm!: FormGroup;
  isFormVisible = true;
  selectedDate: any;
  selectedTime: any;
  bookedDates: any[] = [];
  canceledDates: any[] = [];
  date: any;
  public users: any = [];

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
    public dialogRef: MatDialogRef<ViewBookingComponent>
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      category: [''],
      mealType: [''],
      dates: [''],
      bookingCount: [''],
    });
  }

  closeForm() {
    this.dialogRef.close();
  }

  isCanceled(date: any): boolean {
    if (!date || !(date instanceof Date)) {
      return false;
    }
    return this.canceledDates.some((cancelDate) =>
      this.isSameDate(date, cancelDate)
    );
  }

  isSameDate(date1: any, date2: any): boolean {
    if (
      !date1 ||
      !date2 ||
      !(date1 instanceof Date) ||
      !(date2 instanceof Date)
    ) {
      return false;
    }

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  updateSelectedTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    this.selectedTime = `${hours}:${minutes}:${seconds}`;
  }
}
