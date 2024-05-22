import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookService } from '../services/book.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quick-booking',
  templateUrl: './quick-booking.component.html',
  styleUrls: ['./quick-booking.component.css'],
})
export class QuickBookingComponent implements OnInit {
  quickbookingForm!: FormGroup;
  isFormVisible = true;
  minDate: Date;
  myFilter: (d: Date | null) => boolean;

  constructor(
    private fb: FormBuilder,
    private book: BookService,
    public dialogRef: MatDialogRef<QuickBookingComponent>
  ) {
    const today = new Date();
    this.minDate = new Date(today.setDate(today.getDate() + 1));

    this.myFilter = (d: Date | null): boolean => {
      if (!d) return false;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const day = d.getDay();
      const isWeekend = day === 0 || day === 6;

      return d > today && !isWeekend;
    };
  }

  ngOnInit(): void {
    this.quickbookingForm = this.fb.group({
      category: ['', Validators.required],
      mealType: ['', Validators.required],
      selectedDate: [
        null,
        [Validators.required, this.dateValidator.bind(this)],
      ],
    });
  }

  closeForm() {
    this.dialogRef.close();
  }

  bookMeal(): void {
    if (this.quickbookingForm.valid) {
      console.log(this.quickbookingForm.value);
      this.closeForm();
    }
  }

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    if (!selectedDate) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isWeekend =
      selectedDate.getDay() === 0 || selectedDate.getDay() === 6;

    if (selectedDate <= today || isWeekend) {
      return { dateInvalid: true };
    }
    return null;
  }

  isAfterEightPM(): boolean {
    const now = new Date();
    return now.getHours() >= 20;
  }
}
