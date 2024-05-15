import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  ShowSuccess() {
    this.toastr.success('Toaster added succesfully.');
  }
}
