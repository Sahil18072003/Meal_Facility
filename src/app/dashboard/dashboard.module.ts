import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AboutComponent } from '../about/about.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from '../terms-and-condition/terms-and-condition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AboutComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionComponent,
    ProfileCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
