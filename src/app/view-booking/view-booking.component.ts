import { Component } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css'],
})
export class ViewBookingComponent {
  selectedDate: any;
  user: any;
  bookings: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewBookingComponent>,
    private authService: AuthService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user && this.user.id) {
      this.bookService.viewUserBooking(this.user.id).subscribe((data) => {
        this.bookings = data;
      });
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
}
