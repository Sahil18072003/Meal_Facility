import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validateform';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  toggleVisibility(): void {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.signupForm.valid) {
      // Send only necessary fields to the database
      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.toast.success({
            detail: 'success',
            summary: res.message,
            duration: 3000,
          });
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.toast.success({
            detail: 'error',
            summary: err?.error.message,
            duration: 3000,
          });
        },
      });

      console.log(this.signupForm.value);
    } else {
      //throw an error using toaster and with required fields
      console.log('Form is not valid');
      ValidateForm.validdateAllFromFileds(this.signupForm);
      this.toast.success({
        detail: 'warn',
        summary: 'Your form is invalid',
        duration: 3000,
      });
    }
  }
}
