import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MaterialModule } from './material-module';
import { MatDialogModule } from '@angular/material/dialog';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { QrCouponComponent } from './qr-coupon/qr-coupon.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddBookingComponent,
    ViewBookingComponent,
    QrCouponComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({}),
    NgToastModule,
    MaterialModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
