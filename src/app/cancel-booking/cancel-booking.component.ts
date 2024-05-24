import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css'],
})
export class CancelBookingComponent {
  constructor(public dialogRef: MatDialogRef<CancelBookingComponent>) {}

  ngOnInit(): void {}

  cancelBooking() {
    this.closeForm();
  }

  closeForm() {
    this.dialogRef.close();
  }
}
