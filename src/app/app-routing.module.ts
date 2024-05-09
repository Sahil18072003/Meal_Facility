import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
