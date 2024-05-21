import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import ValidateForm from '../helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  otpVerificationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.otpVerificationForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.otpVerificationForm.valid) {
      console.log(this.otpVerificationForm.value)
      this.auth.otpverification(this.otpVerificationForm.value).subscribe({
        next: (res) => {
          this.otpVerificationForm.reset();
          this.snackBar.open(res.message, 'Okay', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['reset-password']);
        },
        error: (err) => {
          alert(err.message);
          // this.snackBar.open(err.message, 'Try again', {
          //   duration: 3000,
          //   verticalPosition: 'top',
          //   horizontalPosition: 'right',
          //   panelClass: ['error-snackbar'],
          // });
        },
      });
    } else {
      ValidateForm.validdateAllFromFileds(this.otpVerificationForm);
      this.snackBar.open('Your form is invalid', 'Try again', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
      });
    }
  }
}
