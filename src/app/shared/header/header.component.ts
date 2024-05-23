import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from 'src/app/notification/notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showFiller = false;

  public users: any = [];

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  openSidebar() {
    this.dialog.open(SidebarComponent);
  }

  openNotification() {
    this.dialog.open(NotificationComponent);
  }
}
