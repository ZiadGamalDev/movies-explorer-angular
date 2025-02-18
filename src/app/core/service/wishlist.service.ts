import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../interface/Movie';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems: Movie[] = [];
  private wishlistSubject = new BehaviorSubject<Movie[]>([]);
  private watchListCount = new BehaviorSubject<number>(0);
  watchListCount$ = this.watchListCount.asObservable();

  constructor(
    private _ToastrService: ToastrService, 
    private _AuthService: AuthService
  ) {
    
    this.loadUserWishlist();
  }

  private get storageKeys(): { wishlist: string; count: string } {
    const userId = this._AuthService.userInfo?.id;
    return {
      wishlist: `movieWishlist_${userId}`,
      count: `watchListCount_${userId}`
    };
  }

   loadUserWishlist(): void {
    
    if (!this._AuthService.userInfo) {
      this._AuthService.decodeUser();
    }

    const { wishlist: wishlistKey, count: countKey } = this.storageKeys;
    
    const savedWishlist = localStorage.getItem(wishlistKey);
    const savedCount = localStorage.getItem(countKey);

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
    if (!this._AuthService.userInfo) {
      this._ToastrService.warning('Please login to add to wishlist', 'Login Required');
      return;
    }

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
    if (!this._AuthService.userInfo) {
      this._ToastrService.warning('Please login to remove from wishlist', 'Login Required');
      return;
    }

    const movie = this.wishlistItems.find((item) => item.id === movieId);

    if (movie) {
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
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlistItems.some((item) => item.id === movieId);
  }

  private updateWishlist(): void {
    const { wishlist: wishlistKey, count: countKey } = this.storageKeys;

    this.wishlistSubject.next(this.wishlistItems);
    localStorage.setItem(wishlistKey, JSON.stringify(this.wishlistItems));

    this.watchListCount.next(this.wishlistItems.length);
    localStorage.setItem(countKey, JSON.stringify(this.wishlistItems.length));
  }
  clearWishlistOnLogout(): void {
    this.wishlistItems = [];
    this.wishlistSubject.next([]);
    this.watchListCount.next(0);
  }
 
  
}