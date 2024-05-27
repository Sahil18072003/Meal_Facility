import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { ViewBookingComponent } from '../view-booking/view-booking.component';
import { CancelBookingComponent } from '../cancel-booking/cancel-booking.component';
import { QuickBookingComponent } from '../quick-booking/quick-booking.component';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { QrCouponComponent } from '../qr-coupon/qr-coupon.component';

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
  datesToHighlight: Date[] = [];

  dayMenus: { [key: string]: { lunch: string[]; dinner: string[] } } = {
    Sunday: { lunch: [], dinner: [] },
    Monday: {
      lunch: ['Chole', 'Dal Fry', 'Jeera Rice', 'Puri'],
      dinner: ['Pav Bhaji', 'Biryani', 'Kadhi'],
    },
    Tuesday: {
      lunch: ['Paneer Butter Masala', 'Naan', 'Salad', 'Raita'],
      dinner: ['Rajma', 'Rice', 'Chapati', 'Gulab Jamun'],
    },
    Wednesday: {
      lunch: ['Aloo Gobi', 'Paratha', 'Dahi', 'Papad'],
      dinner: ['Dosa', 'Sambar', 'Chutney', 'Kheer'],
    },
    Thursday: {
      lunch: ['Chana Masala', 'Rice', 'Chapati', 'Salad'],
      dinner: ['Fried Rice', 'Manchurian', 'Soup', 'Ice Cream'],
    },
    Friday: {
      lunch: ['Bhindi Fry', 'Dal Tadka', 'Rice', 'Chapati'],
      dinner: ['Pizza', 'Pasta', 'Garlic Bread', 'Brownie'],
    },
    Saturday: { lunch: [], dinner: [] },
  };

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      // Handle user data retrieval
    });

    this.updateMenu();
    this.generateDatesToHighlight();
  }

  openAddBookingDialog() {
    this.dialog.open(AddBookingComponent);
  }

  openQuickBookingDialog() {
    this.dialog.open(QuickBookingComponent);
  }

  openViewBookingDialog() {
    this.dialog.open(ViewBookingComponent);
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

  generateDatesToHighlight() {
    const startDate = new Date('2024-05-20T18:30:00.000Z');
    const endDate = new Date('2024-05-28T18:30:00.000Z');
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        this.datesToHighlight.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesToHighlight.some(
        (d) =>
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
      );

      return highlightDate ? 'highlight-date' : '';
    };
  }
}
