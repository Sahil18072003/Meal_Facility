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

  bookMeal(): void {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
      this.closeForm();
    }
  }
}
