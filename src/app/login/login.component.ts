import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validateform';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  toggleVisibility(): void {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      //Send the obj to database
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          // alert(res.message);
          this.loginForm.reset();
          this.toast.success("Success");
          this.router.navigate(['home']);
        },
        error: (err) => {
          // alert(err?.error.message);
          this.toast.error(err?.error.message);
        },
      });

      console.log(this.loginForm.value);
    } else {
      //throw a error using toaster and with required fields
      console.log('form is not valid');
      ValidateForm.validdateAllFromFileds(this.loginForm);
      // this.toast.warning({
      //   detail: 'warn',
      //   summary: 'Your form is invalid',
      //   duration: 3000,
      // });
    }
  }
}
