import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { TermsAndConditionComponent } from '../terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { ChangePasswordComponent } from '../change-password/change-password.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
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
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
