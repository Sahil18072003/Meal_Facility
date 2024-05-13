import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'terms-and-condition',
    component: TermsAndConditionComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { hideHeaderFooter: true },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { hideHeaderFooter: true },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { hideHeaderFooter: true },
  },
  {
    path: 'otp-verification',
    component: OtpVerificationComponent,
    data: { hideHeaderFooter: true },
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { hideHeaderFooter: true },
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { hideHeaderFooter: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
