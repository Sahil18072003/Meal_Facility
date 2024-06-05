import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { ViewBookingComponent } from '../view-booking/view-booking.component';
import { CancelBookingComponent } from '../cancel-booking/cancel-booking.component';
import { QuickBookingComponent } from '../quick-booking/quick-booking.component';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { QrCouponComponent } from '../qr-coupon/qr-coupon.component';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { DateAdapter } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedDate: any;
  currentMenu: { lunch: string[]; dinner: string[] } = {
    lunch: [],
    dinner: [],
  };
  bookings: any[] = [];
  user: any;

  canCancelBooking: boolean = false;
  canGenerateQr: boolean = false;

  dayMenus: { [key: string]: { lunch: string[]; dinner: string[] } } = {
    Sunday: { lunch: [], dinner: [] },
    Monday: {
      lunch: ['Chole', 'Dal Fry', 'Jeera Rice', 'Puri', 'Salad'],
      dinner: ['Pav Bhaji', 'Biryani', 'Kadhi', 'Paneer Tikka', 'Dessert'],
    },
    Tuesday: {
      lunch: ['Paneer Butter Masala', 'Naan', 'Salad', 'Raita', 'Soup'],
      dinner: ['Rajma', 'Rice', 'Chapati', 'Gulab Jamun', 'Curd'],
    },
    Wednesday: {
      lunch: ['Aloo Gobi', 'Paratha', 'Dahi', 'Papad', 'Rice'],
      dinner: ['Dosa', 'Sambar', 'Chutney', 'Kheer', 'Vada'],
    },
    Thursday: {
      lunch: ['Chana Masala', 'Rice', 'Chapati', 'Salad', 'Lassi'],
      dinner: [
        'Fried Rice',
        'Manchurian',
        'Soup',
        'Ice Cream',
        'Paneer Chilli',
      ],
    },
    Friday: {
      lunch: ['Bhindi Fry', 'Dal Tadka', 'Rice', 'Chapati', 'Salad'],
      dinner: ['Pizza', 'Pasta', 'Garlic Bread', 'Brownie', 'Soup'],
    },
    Saturday: { lunch: [], dinner: [] },
  };

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private bookService: BookService,
    private dateAdapter: DateAdapter<Date>
  ) {}

ngOnInit() {
  this.selectedDate = new Date();
  this.updateMenu();
  this.fetchBookings();

  this.user = this.authService.getUser();
  if (this.user && this.user.id) {
    this.fetchBookings();
  }

  this.updateButtonStates();
}


  fetchBookings(): void {
    this.bookService.viewUserBooking().subscribe({
      next: (res) => {
        this.bookings = res;
        this.updateButtonStates();
        this.refreshCalendar();
        console.log(this.user);
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

  openAddBookingDialog() {
    const dialog = this.dialog.open(AddBookingComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchBookings();
      }
    });
  }

  openQuickBookingDialog() {
    const dialog = this.dialog.open(QuickBookingComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchBookings();
      }
    });
  }

  openViewBookingDialog() {
    const dialog = this.dialog.open(ViewBookingComponent, {
      data: { bookings: this.bookings },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchBookings();
      }
    });
  }

  openCancelBookingDialog() {
    const dialog = this.dialog.open(CancelBookingComponent, {
      data: { selectedDate: this.selectedDate },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchBookings();
      }
    });
  }

  openQrDialog() {
    this.dialog.open(QrCouponComponent);
  }

  updateMenu() {
    if (this.selectedDate) {
      const dayOfWeek = this.selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
      });
      this.currentMenu = this.dayMenus[dayOfWeek] || { lunch: [], dinner: [] };
    }
  }

  onSelect(event: any) {
    this.selectedDate = event;
    this.updateMenu();
    this.updateButtonStates();
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
        return booking.status === 'Cancelled' ? '' : 'booking-date';
      }

      return '';
    };
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }

    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const threeMonthsFromToday = new Date();
    threeMonthsFromToday.setMonth(threeMonthsFromToday.getMonth() + 3);

    return (
      date.getTime() >= startOfToday.getTime() &&
      date.getTime() <= threeMonthsFromToday.getTime() &&
      date.getDay() !== 0 &&
      date.getDay() !== 6
    );
  };

  private updateButtonStates() {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));

    this.canGenerateQr =
      this.selectedDate &&
      this.selectedDate.getTime() === startOfToday.getTime();

    this.canCancelBooking =
      this.selectedDate &&
      this.bookings.some((b: any) => {
        const bookingDate = new Date(b.bookingDate);
        return (
          bookingDate.getDate() === this.selectedDate.getDate() &&
          bookingDate.getMonth() === this.selectedDate.getMonth() &&
          bookingDate.getFullYear() === this.selectedDate.getFullYear()
        );
      });
  }
}
