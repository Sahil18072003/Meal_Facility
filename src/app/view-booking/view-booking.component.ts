import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { DateAdapter } from '@angular/material/core';

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
    private bookService: BookService,
    private authService: AuthService,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user && this.user.id) {
      this.fetchBookings();
    }
  }

  fetchBookings(): void {
    this.bookService.viewUserBooking().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.bookings = res;
          this.refreshCalendar();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  refreshCalendar() {
    this.selectedDate = new Date(this.selectedDate!.getTime());
    this.dateAdapter.setLocale('en-US');
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
