import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css'],
})
export class ViewBookingComponent implements OnInit {
  selectedDate: any;
  user: any;
  bookings: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.data.bookings) {
      this.bookings = this.data.bookings;
    }
  }

  onSelect(event: any) {
    this.selectedDate = event;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return '';
      }

      const booking = this.bookings.find((b: any) => {
        const bookingDate = new Date(b.bookingDate);
        return (
          bookingDate.getDate() === date.getDate() &&
          bookingDate.getMonth() === date.getMonth() &&
          bookingDate.getFullYear() === date.getFullYear()
        );
      });

      console.log(booking);

      if (booking) {
        return booking.status === 'Cancelled' ? 'cancel-date' : 'booking-date';
      }

      return '';
    };
  }

  getActiveBookingsCount(): number {
    return this.bookings.filter((b: any) => b.status !== 'Cancelled').length;
  }

  generateDatesInRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString());
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    return dates;
  }

  closeForm() {
    this.dialogRef.close();
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
}
