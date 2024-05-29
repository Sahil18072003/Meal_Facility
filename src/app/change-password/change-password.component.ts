import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validateform';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  type1: string = 'password';
  isText1: boolean = false;
  eyeIcon1: string = 'fa-eye-slash';

  toggleVisibility(): void {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  toggleVisibility1(): void {
    this.isText1 = !this.isText1;
    this.isText1
      ? (this.eyeIcon1 = 'fa-eye')
      : (this.eyeIcon1 = 'fa-eye-slash');
    this.isText1 ? (this.type1 = 'text') : (this.type1 = 'password');
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.changePasswordForm.valid) {
      this.auth.changePassword(this.changePasswordForm.value).subscribe({
        next: (res) => {
          this.changePasswordForm.reset();

          this.snackBar.open(res.message, 'Okay', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });

          this.router.navigate(['otp-verification']);
        },
        error: (err) => {
          this.snackBar.open(err, 'Try again', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      ValidateForm.validdateAllFromFileds(this.changePasswordForm);
      this.snackBar.open('Your form is invalid', 'Try again', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
      });
    }
  }
}
