import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../core/service/wishlist.service';
import { Observable } from 'rxjs';
import { Movie } from '../core/interface/Movie';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  wishlist$: Observable<Movie[]>;
  movies: Movie[] = [];
  constructor(
    private _wishlistService: WishlistService,
    private _router: Router
  ) {
    this._wishlistService.getWishlist().subscribe((movies) => {
      this.movies = movies;
      console.log('Wishlist movies:', this.movies);
    });

    this.wishlist$ = this._wishlistService.getWishlist();
    console.log(this.wishlist$);
  }
  ngOnInit(): void {}

  navigateToMovie(movieId: number): void {
    this._router.navigate(['/movie', movieId]);
  }

  navigateToHome(): void {
    this._router.navigate(['/']);
  }
}
