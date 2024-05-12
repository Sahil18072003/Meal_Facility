import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  hide = true;
  type = 'password';

  toggleVisibility(): void {
    this.hide = !this.hide;
    this.type == 'password' ? (this.type = 'text') : (this.type = 'password');
  }

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      alert('Form signup successfully.');
      //send data to database
    } else {
      console.log('form is not valid');
      //throw a error using toaster and with  required fileds
      this.validdateAllFromFileds(this.signupForm);
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
