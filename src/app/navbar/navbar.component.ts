import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../core/service/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  watchCount = 0;
  constructor(private wishService: WishlistService) {}
  ngOnInit(): void {
    this.wishService.watchListCount$.subscribe(
      (count) => (this.watchCount = count)
    );
  }
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 100) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
