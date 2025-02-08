import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Movie } from '../../core/interface/Movie';
import { RequestsService } from '../../core/service/requests.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css',
})
export class RecommendationsComponent implements OnChanges {
  @Input() movieId!: number;
  recommendations: Movie[] = [];

  constructor(private requests: RequestsService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieId'] && changes['movieId'].currentValue) {
      this.fetchRecommendations(changes['movieId'].currentValue);
    }
  }

  fetchRecommendations(movieId: number) {
    this.requests.getRecommendations(movieId).subscribe((data) => {
      this.recommendations = data.results;
    });
  }

  navigateToMovieDetail(id: number) {
    this.router.navigate(['/movie', id]);
  }

  calcProgress(voteAverage: number): number {
    const percentage = (voteAverage / 10) * 113;
    return 113 - percentage;
  }
}
