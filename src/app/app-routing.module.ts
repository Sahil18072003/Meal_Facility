import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

const routes: Routes = [
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
    path: 'forget-password',
    component: ForgetPasswordComponent,
    data: { hideHeaderFooter: true },
  },
  {
    path: 'otp-verification',
    component: OtpVerificationComponent,
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
