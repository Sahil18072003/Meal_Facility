import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CancelBookingComponent } from 'src/app/cancel-booking/cancel-booking.component';
import { LogoutComponent } from 'src/app/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private auth: AuthService, public dialog: MatDialog) {}

  openLogoutDialog() {
    this.dialog.open(LogoutComponent);
  }
}
