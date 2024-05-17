import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showFiller = false;

  public users: any = [];

  constructor(
    private auth: AuthService,
    private api: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  openSidebar() {
    this.dialog.open(SidebarComponent);
  }
}
