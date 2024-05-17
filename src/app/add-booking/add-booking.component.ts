import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AddBookingComponent>
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
