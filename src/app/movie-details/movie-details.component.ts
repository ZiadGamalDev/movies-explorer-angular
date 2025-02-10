import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../core/service/requests.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../core/interface/Movie';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { WishlistService } from '../core/service/wishlist.service';
import { UpToTopComponent } from '../up-to-top/up-to-top.component';
import { RatingStarsPipe } from '../core/pipe/rating-stars.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    RecommendationsComponent,
    NotFoundComponent,
    UpToTopComponent,
    RatingStarsPipe
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movie!: Movie;
  isInWishlist: boolean = false;
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
    this.requests.getMovieDetails(id).subscribe((res) => {
      this.movie = res;
    });
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
