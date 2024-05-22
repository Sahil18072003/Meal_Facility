import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LogoutComponent } from 'src/app/logout/logout.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SidebarComponent>
  ) {}

  openLogoutDialog() {
    this.dialog.open(LogoutComponent);
    this.closeSidebar();
  }

  onclick() {
    this.closeSidebar();
  }

  closeSidebar() {
    this.dialogRef.close();
  }
}
