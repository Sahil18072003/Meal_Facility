import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { ViewBookingComponent } from '../view-booking/view-booking.component';
import { CancelBookingComponent } from '../cancel-booking/cancel-booking.component';
import { QuickBookingComponent } from '../quick-booking/quick-booking.component';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { QrCouponComponent } from '../qr-coupon/qr-coupon.component';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { DateAdapter } from '@angular/material/core';
import { CouponService } from '../services/coupon.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isExpired: boolean = false;
  showQRCode: boolean = false;
  showBtn: boolean = true;

  uniqueId: number | null = null;
  secondsLeft: number = 0;
  expirationInterval: any;
  expirationTimeout: any;

  public qrdata: string = '';
  public userId: any;

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
    private couponService: CouponService,
    private dateAdapter: DateAdapter<Date>,
    public dialogRef: MatDialogRef<QrCouponComponent>,
    private snackBar: MatSnackBar
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
    const user = this.authService.getUser();
    if (user) {
      this.uniqueId = parseInt(user.id, 10);
      console.log(this.uniqueId);
      this.couponService.createCoupon(this.uniqueId).subscribe((res) => {
        console.log(res);
        this.qrdata = res.coupon.couponCode;
        console.log(this.qrdata);
        this.userId = res.coupon.userId;
        console.log(this.userId);
        this.showQRCode = true;
        this.showBtn = false;
        console.log(res.coupon.expirationTime);
        console.log(res.coupon.createdTime);

        const currentTime = new Date().getTime();
        const expirationTime = new Date(res.coupon.expirationTime).getTime();
        const expirationDuration = expirationTime - currentTime;

        // Set the expiration timer
        this.setExpirationTimer(expirationDuration);

        // Calculate seconds left instead of minutes
        this.secondsLeft = Math.ceil(expirationDuration / 1000);

        this.expirationInterval = setInterval(() => {
          this.secondsLeft--;
          if (this.secondsLeft <= 0) {
            clearInterval(this.expirationInterval);
            this.isExpired = true;
            this.dialogRef.close();

            this.snackBar.open('QR Code has expired', 'Okay', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['error-snackbar'],
            });
          }
        }, 1000);
      });
    }
  }

  setExpirationTimer(duration: number) {
    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout);
    }
    this.expirationTimeout = setTimeout(() => {
      this.showQRCode = false;
      this.isExpired = true;

      this.snackBar.open('QR Code has expired', 'Okay', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
      });
    }, duration);
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
