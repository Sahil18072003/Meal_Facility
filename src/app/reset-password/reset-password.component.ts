import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import ValidateForm from '../helpers/validateform';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  toggleVisibility(): void {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.resetPasswordForm.valid) {
      this.auth.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          this.resetPasswordForm.reset();

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
      ValidateForm.validdateAllFromFileds(this.resetPasswordForm);
      this.snackBar.open('Your form is invalid', 'Try again', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
      });
    }
  }
}
