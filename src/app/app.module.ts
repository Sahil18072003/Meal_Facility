import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TermsAndConditionComponent } from './header/terms-and-condition/terms-and-condition.component';

@NgModule({
  declarations: [AppComponent, TermsAndConditionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
