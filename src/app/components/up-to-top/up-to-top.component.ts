import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-up-to-top',
  imports: [CommonModule],
  templateUrl: './up-to-top.component.html',
  styleUrl: './up-to-top.component.css'
})
export class UpToTopComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 100;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
