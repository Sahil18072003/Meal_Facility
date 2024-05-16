import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showFiller = false;

  public users: any = [];

  constructor(private auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  addBooking() {
    // Logic for adding booking
  }

  Logout() {
    this.auth.signOut();
  }
}
