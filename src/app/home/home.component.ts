import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookingComponent } from '../add-booking/add-booking.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedDate: any;
  selectedTime: any;
  bookedDates: any[] = [];
  canceledDates: any[] = [];
  date: any;
  public users: any = [];

  fillDates() {
    this.bookedDates = [
      new Date('2024-05-10'),
      new Date('2024-05-15'),
      new Date('2024-05-20'),
      new Date('2024-05-25'),
      new Date('2024-05-30'),
    ];

    this.canceledDates = [
      new Date('2024-06-02'),
      new Date('2024-06-07'),
      new Date('2024-06-12'),
      new Date('2024-06-17'),
      new Date('2024-06-22'),
    ];
  }

  isWeekend(date: any): boolean {
    if (!date || !(date instanceof Date)) {
      return false;
    }
    const day = date.getDay();
    return day === 6 || day === 0;
  }

  preventSelection = (date: any): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    return !this.isWeekend(date) && !this.isCanceled(date) && date >= today;
  };

  // isBooked(date: any): boolean {
  //   if (!date || !(date instanceof Date)) {
  //     return false; // If date is undefined or not a Date object, it's not booked
  //   }
  //   return this.bookedDates.some((bookedDate) =>
  //     this.isSameDate(date, bookedDate)
  //   );
  // }

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

  constructor(
    private api: ApiService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {
    this.fillDates();
  }

  openAddBookingDialog() {
    this.dialog.open(AddBookingComponent);
  }

  openViewBookingDialog() {
    this.dialog.open(AddBookingComponent);
  }

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  logout() {
    this.auth.signOut();
  }
  signgout() {
    this.auth.signOut();
  }
}
