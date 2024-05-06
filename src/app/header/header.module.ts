import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
  ],
  imports: [CommonModule],
})
export class HeaderModule {}
