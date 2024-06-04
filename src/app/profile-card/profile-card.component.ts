import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() role!: string;
  @Input() github!: string;
  @Input() linkedIn!: string;
  @Input() instagram!: string;
  @Input() image!: string;

  isSocialVisible = false;

  toggleSocial() {
    this.isSocialVisible = !this.isSocialVisible;
  }
}
