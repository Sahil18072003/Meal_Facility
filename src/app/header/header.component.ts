import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @ViewChild('sidemenu') sidemenu!: ElementRef;

  constructor(private renderer: Renderer2) {}

  openSidebar() {
    const modal = this.sidemenu.nativeElement;
    const isModalHidden = !modal.classList.contains('show');

    if (isModalHidden) {
      this.renderer.addClass(modal, 'show');

      // Add the 'show' class to the modal backdrop
      const modalBackdrop = document.createElement('div');
      modalBackdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(modalBackdrop);
    } else {
      // If the modal is already shown, remove the 'show' class
      this.renderer.removeClass(modal, 'show');

      // Remove the modal backdrop
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }
}
