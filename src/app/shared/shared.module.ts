import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, SidebarComponent],

  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [FooterComponent, HeaderComponent, SidebarComponent],
})
export class SharedModule {}
