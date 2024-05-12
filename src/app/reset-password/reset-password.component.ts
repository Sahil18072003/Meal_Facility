import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
      alert('Form Login successfully.');
      //send data to database
    } else {
      console.log('Form is not valid');
      //throw a error using toaster and with  required fileds
      this.validdateAllFromFileds(this.resetPasswordForm);
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
