import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ValidateForm from '../helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.forgotPasswordForm.valid) {
      //send data to database
      console.log(this.forgotPasswordForm.value);
      alert('Otp sent successfully.');
    } else {
      //throw a error using toaster and with  required fields
      console.log('Form is not valid');
      ValidateForm.validdateAllFromFileds(this.forgotPasswordForm);
      alert('Your form is invalid');
    }
  }
}
