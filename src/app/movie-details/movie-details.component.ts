import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../core/service/requests.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../core/interface/Movie';
import { RecommendationsComponent } from "./recommendations/recommendations.component";
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RecommendationsComponent, NotFoundComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movie!: Movie;

  constructor(
    private requests: RequestsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        this.getMovieData(+movieId);
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
