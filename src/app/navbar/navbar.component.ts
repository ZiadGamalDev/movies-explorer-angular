import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../core/service/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  watchCount=0
  constructor(private wishService:WishlistService) { }
  ngOnInit(): void {
    this.wishService.watchListCount$.subscribe(count => this.watchCount=count);
  }
}
