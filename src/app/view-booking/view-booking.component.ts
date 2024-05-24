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

  // Assuming start and end dates
  startDate = new Date('2024-05-20T18:30:00.000Z');
  endDate = new Date('2024-05-28T18:30:00.000Z');

  datesToHighlight: string[] = this.generateDatesInRange(
    this.startDate,
    this.endDate
  );

  onSelect(event: any) {
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

  constructor(public dialogRef: MatDialogRef<ViewBookingComponent>) {}

  ngOnInit() {}

  closeForm() {
    this.dialogRef.close();
  }
}
