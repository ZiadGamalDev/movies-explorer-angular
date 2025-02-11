import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../interface/Movie';
@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems: Movie[] = [];
  private wishlistSubject = new BehaviorSubject<Movie[]>([]);
  private watchListCount = new BehaviorSubject<number>(0);
  watchListCount$ = this.watchListCount.asObservable();

  constructor(private _ToastrService: ToastrService) {
    const savedWishlist = localStorage.getItem('movieWishlist');
    const savedCount = localStorage.getItem('watchListCount'); // Retrieve saved count

    if (savedWishlist) {
      this.wishlistItems = JSON.parse(savedWishlist);
      this.wishlistSubject.next(this.wishlistItems);
    }

    this.watchListCount.next(
      savedCount ? JSON.parse(savedCount) : this.wishlistItems.length
    );
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
        'Success',
        { toastClass: 'ngx-toastr custom-toast1' }
      );
    }
  }

  removeFromWishlist(movieId: number): void {
    const movie: any = this.wishlistItems.find((item) => item.id === movieId);

    this.wishlistItems = this.wishlistItems.filter(
      (item) => item.id !== movieId
    );
    this.updateWishlist();

    this._ToastrService.info(
      `${movie.title} removed from wishlist`,
      'Removed',
      { toastClass: 'ngx-toastr custom-toast2' }
    );
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlistItems.some((item) => item.id === movieId);
  }

  private updateWishlist(): void {
    this.wishlistSubject.next(this.wishlistItems);
    localStorage.setItem('movieWishlist', JSON.stringify(this.wishlistItems));

    this.watchListCount.next(this.wishlistItems.length);
    localStorage.setItem(
      'watchListCount',
      JSON.stringify(this.wishlistItems.length)
    );
  }
}
