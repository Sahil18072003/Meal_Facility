import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './header/about/about.component';
import { PrivacyPolicyComponent } from './footer/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './footer/terms-and-condition/terms-and-condition.component';
import { ForgetPasswordComponent } from './header/forget-password/forget-password.component';
import { SignupComponent } from './header/signup/signup.component';
import { LoginComponent } from './header/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
    ],
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  // },
  {
    path: '',
    component: FooterComponent,
    children: [
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'terms-and-condition',
        component: TermsAndConditionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
