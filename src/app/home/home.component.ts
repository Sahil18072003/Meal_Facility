import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { ViewBookingComponent } from '../view-booking/view-booking.component';
import { CancelBookingComponent } from '../cancel-booking/cancel-booking.component';
import { QuickBookingComponent } from '../quick-booking/quick-booking.component';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedDate: Date = new Date();

  // Assuming start and end dates
  startDate = new Date('2024-05-20T18:30:00.000Z');
  endDate = new Date('2024-05-28T18:30:00.000Z');

  datesToHighlight: string[] = this.generateDatesInRange(
    this.startDate,
    this.endDate
  );

  currentMenu: { lunch: string[]; dinner: string[] } = {
    lunch: [],
    dinner: [],
  };

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

  constructor(
    private api: ApiService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.onDateSelected(this.selectedDate);
    this.api.getUsers().subscribe((res) => {
      // Handle user data retrieval
    });
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

  onDateSelected(date: Date) {
    this.selectedDate = date;
    const dayName = this.getDayName(date);
    this.currentMenu = this.dayMenus[dayName] || { lunch: [], dinner: [] };
  }

  getDayName(date: Date): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  }

  // Function to generate dates between start and end date
  generateDatesInRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString());
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
    }
    return dates;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return '';
      }

      const highlightDate = this.datesToHighlight
        .map((strDate) => new Date(strDate))
        .some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );

      return highlightDate ? 'special-date-home' : '';
    };
  }
}
