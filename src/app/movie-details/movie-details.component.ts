import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../core/service/requests.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../core/interface/Movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movie: Movie | null = null;

  constructor(
    private requests: RequestsService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const movieId = +params['id'];
      console.log('Movie ID from URL:', movieId);
      if (movieId) {
        this.getMovieData(movieId);
      }
    });
  }

  getMovieData(id: number) {
    this.requests.getMovieDetails(id).subscribe((res) => {
      this.movie = res;
    });
  }

  getStars(voteAverage?: number): number[] {
    if (voteAverage === undefined || voteAverage === null) {
      return [];
    }
    const fullStars = Math.round(voteAverage / 2);
    return Array.from({ length: 5 }, (_, i) => i < fullStars ? 1 : 0);
  }
}
