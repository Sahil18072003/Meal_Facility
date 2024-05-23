import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notifications: string[] }
  ) {}

  @Output() notificationsCleared = new EventEmitter<void>();
  dialogClosed: any;

  removeNotification(index: number): void {
    this.data.notifications.splice(index, 1);
    this.updateLocalStorage();
    if (this.data.notifications.length === 0) {
      this.dialogRef.close();
      this.notificationsCleared.emit();
    }
  }

  clearNotifications(): void {
    this.data.notifications = [];
    this.updateLocalStorage();
    this.notificationsCleared.emit();
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateLocalStorage(): void {
    localStorage.setItem(
      'notifications',
      JSON.stringify(this.data.notifications)
    );
  }
}
