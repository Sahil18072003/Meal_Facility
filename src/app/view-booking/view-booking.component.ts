import { Component } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css'],
})
export class ViewBookingComponent {
  selectedDate: any;
  minDate: Date;
  myFilter: (d: Date | null) => boolean;

  // Assuming start and end dates
  startDate = new Date('2024-05-25T18:30:00.000Z');
  endDate = new Date('2024-05-28T18:30:00.000Z');

  datesToHighlight: string[] = this.generateDatesInRange(
    this.startDate,
    this.endDate
  );

  constructor(public dialogRef: MatDialogRef<ViewBookingComponent>) {
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

  ngOnInit() {}

  onSelect(event: any) {
    console.log(event);
    this.selectedDate = event;
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

      return highlightDate ? 'special-date' : '';
    };
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

  closeForm() {
    this.dialogRef.close();
  }
}
