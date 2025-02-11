import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../core/service/requests.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../core/interface/Movie';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { UpToTopComponent } from '../up-to-top/up-to-top.component';
import { RatingStarsPipe } from '../core/pipe/rating-stars.pipe';
import { WishlistService } from '../core/service/wishlist.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    RecommendationsComponent,
    NotFoundComponent,
    UpToTopComponent,
    RatingStarsPipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  movie!: Movie;
  isInWishlist: boolean = false;
  isLoading: boolean = true; // Add loading state
  notFound: boolean = false; // Handle 404-like scenario

  constructor(
    private requests: RequestsService,
    private _wishlistService: WishlistService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const movieId: any = params.get('id');
      if (movieId) {
        this.getMovieData(+movieId);
      }
      this.isInWishlist = this._wishlistService.isInWishlist(+movieId);
    });
  }

  getMovieData(id: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.isLoading = true; // Start loading
    this.requests.getMovieDetails(id).subscribe(
      (res) => {
        this.movie = res;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      (error) => {
        console.error(error);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.notFound = true; // Handle movie not found
      }
    );
  }

  get heartIconClass(): string {
    return `fa-heart favorite-icon me-5 ${
      this.isInWishlist ? 'fa-solid' : 'fa-regular'
    }`;
  }

  toggleWishlist(): void {
    if (this.isInWishlist) {
      this._wishlistService.removeFromWishlist(this.movie.id);
    } else {
      this._wishlistService.addToWishlist(this.movie);
    }
    this.isInWishlist = !this.isInWishlist;
  }
}
