import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validateform';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;

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
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        Validators.required,
        // Validators.minLength(8),
        // Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/),
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.signupForm.valid) {
      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.snackBar.open(err.message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      ValidateForm.validdateAllFromFileds(this.signupForm);
      this.snackBar.open('Your form is invalid', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
      });
    }
  }
}
