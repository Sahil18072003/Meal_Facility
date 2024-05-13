import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  otpVerificationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.otpVerificationForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.otpVerificationForm.valid) {
      console.log(this.otpVerificationForm.value);
      alert('Otp verification successfully.');
      //send data to database
    } else {
      console.log('Form is not valid');
      //throw a error using toaster and with  required fileds
      this.validdateAllFromFileds(this.otpVerificationForm);
      alert('Your form is invalid');
    }
  }

  private validdateAllFromFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validdateAllFromFileds(control);
      }
    });
  }
}
