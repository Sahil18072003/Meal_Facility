import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  logoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public dialogRef: MatDialogRef<LogoutComponent>
  ) {}

  ngOnInit(): void {
    this.logoutForm = this.fb.group({
      reason: ['', Validators.required],
    });
  }

  Logout() {
    this.auth.signOut();
    this.closeForm();
  }

  closeForm() {
    this.dialogRef.close();
  }
}
