import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderFooterRoutingModule } from './header-footer-routing.module';
import { HeaderFooterComponent } from './header-footer.component';


@NgModule({
  declarations: [
    HeaderFooterComponent
  ],
  imports: [
    CommonModule,
    HeaderFooterRoutingModule
  ]
})
export class HeaderFooterModule { }
