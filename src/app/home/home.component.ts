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

  dayMenus: { [key: string]: { lunch: string[]; dinner: string[] } } = {
    Sunday: { lunch: [], dinner: [] },
    Monday: {
      lunch: ['Chole', 'Dal Fry', 'Jeera Rice', 'Puri', 'Salad', 'Raita'],
      dinner: [
        'Pav Bhaji',
        'Biryani',
        'Kadhi',
        'Paneer Tikka',
        'Soup',
        'Dessert',
      ],
    },
    Tuesday: {
      lunch: [
        'Paneer Butter Masala',
        'Naan',
        'Salad',
        'Raita',
        'Soup',
        'Fruit Salad',
      ],
      dinner: ['Rajma', 'Rice', 'Chapati', 'Gulab Jamun', 'Pickle', 'Curd'],
    },
    Wednesday: {
      lunch: ['Aloo Gobi', 'Paratha', 'Dahi', 'Papad', 'Rice', 'Dal'],
      dinner: ['Dosa', 'Sambar', 'Chutney', 'Kheer', 'Vada', 'Samosa'],
    },
    Thursday: {
      lunch: ['Chana Masala', 'Rice', 'Chapati', 'Salad', 'Lassi', 'Soup'],
      dinner: [
        'Fried Rice',
        'Manchurian',
        'Soup',
        'Ice Cream',
        'Spring Roll',
        'Paneer Chilli',
      ],
    },
    Friday: {
      lunch: ['Bhindi Fry', 'Dal Tadka', 'Rice', 'Chapati', 'Salad', 'Raita'],
      dinner: [
        'Pizza',
        'Pasta',
        'Garlic Bread',
        'Brownie',
        'Caesar Salad',
        'Soup',
      ],
    },
    Saturday: { lunch: [], dinner: [] },
  };

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.selectedDate = new Date();
    this.updateMenu();

    this.user = this.authService.getUser();
    if (this.user && this.user.id) {
      this.fetchBookings();
    }
  }

  fetchBookings() {
    this.bookService.viewUserBooking(this.user.id).subscribe((data) => {
      this.bookings = data;
    });
  }

  openAddBookingDialog() {
    this.dialog.open(AddBookingComponent);
  }

  openQuickBookingDialog() {
    this.dialog.open(QuickBookingComponent);
  }

  openViewBookingDialog() {
    this.dialog.open(ViewBookingComponent, {
      data: { bookings: this.bookings },
    });
  }

  openCancelBookingDialog() {
    this.dialog.open(CancelBookingComponent);
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

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
}
