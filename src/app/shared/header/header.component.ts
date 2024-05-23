import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  name: string | null = null;

  constructor(private auth: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      this.name = storedName;
    } else {
      this.name = 'Guest';
    }
  }

  openSidebar() {
    this.dialog.open(SidebarComponent);
  }

  openNotification() {
    this.dialog.open(NotificationComponent);
  }
}
