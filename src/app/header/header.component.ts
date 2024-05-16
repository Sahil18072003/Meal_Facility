import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @ViewChild('sidemenu') sidemenu!: ElementRef;

  public users: any = [];

  constructor(
    private renderer: Renderer2,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  Logout() {
    this.auth.signOut();
  }
}
