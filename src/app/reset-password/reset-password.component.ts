import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  email: any;

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
    this.email = localStorage.getItem('email');
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.resetPasswordForm.valid) {
      const formData = {
        email: this.email,
        password: this.resetPasswordForm.value.password,
      };

      this.auth.resetPassword(formData).subscribe({
        next: (res) => {
          this.resetPasswordForm.reset();

          this.snackBar.open(res.message, 'Okay', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });

          this.router.navigate(['login']);
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
