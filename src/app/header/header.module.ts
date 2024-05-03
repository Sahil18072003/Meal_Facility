import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';

const routes: Routes = [
  {
    path: '/about',
    component: AboutComponent,
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: '/terms-and-condition',
    component: TermsAndConditionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [HeaderComponent, AboutComponent],
  exports: [RouterModule],
})
export class HeaderModule {}
