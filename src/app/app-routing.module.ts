import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'otp-verification',
    component: OtpVerificationComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
