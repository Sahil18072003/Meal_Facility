import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  constructor(public dialogRef: MatDialogRef<NotificationComponent>) {}
  closeForm() {
    this.dialogRef.close();
  }
}
