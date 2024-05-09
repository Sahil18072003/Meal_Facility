import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  // components directly define which have parent app
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
  ],

  // imports all the modules which have parent app
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
