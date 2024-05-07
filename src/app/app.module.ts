import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HeaderFooterModule } from './header-footer/header-footer.module';

@NgModule({
  // components directly define which have parent app
  declarations: [AppComponent],

  // imports all the modules which have parent app
  imports: [BrowserModule, AppRoutingModule, HeaderFooterModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
