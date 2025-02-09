import { Injectable } from '@angular/core';
import { Movie } from './../interface/Movie';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems: Movie[] = [];
  private wishlistSubject = new BehaviorSubject<Movie[]>([]);

  constructor(private _ToastrService: ToastrService) {
    const savedWishlist = localStorage.getItem('movieWishlist');

    if (savedWishlist) {
      this.wishlistItems = JSON.parse(savedWishlist);
      this.wishlistSubject.next(this.wishlistItems);
    }
  }

  getWishlist(): Observable<Movie[]> {
    return this.wishlistSubject.asObservable();
  }

  addToWishlist(movie: Movie): void {
    if (!this.wishlistItems.some((item) => item.id === movie.id)) {
      this.wishlistItems.push(movie);
      this.updateWishlist();
      this._ToastrService.success(
        `${movie.title} added to wishlist`,
        'Success'
      );
    }
  }

  removeFromWishlist(movieId: number): void {
    const movie: any = this.wishlistItems.find((item) => item.id === movieId);

    this.wishlistItems = this.wishlistItems.filter(
      (item) => item.id !== movieId
    );
    this.updateWishlist();
    this._ToastrService.info(`${movie.title} removed from wishlist`, 'Removed');
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlistItems.some((item) => item.id === movieId);
  }

  private updateWishlist(): void {
    this.wishlistSubject.next(this.wishlistItems);
    localStorage.setItem('movieWishlist', JSON.stringify(this.wishlistItems));
  }
}
