import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../core/service/requests.service';
import { Movie } from '../core/interface/Movie';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  imports: [RouterModule, CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private requests: RequestsService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.requests.getNowPlayingMovies(this.currentPage).subscribe((res) => {
      this.movies = res.results;
      this.totalPages = res.total_pages;
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchMovies();
    }
  }

  getPaginationPages(): number[] {
    let pages: number[] = [];
    let totalToShow = 5;
    let start = Math.max(1, this.currentPage - Math.floor(totalToShow / 2));
    let end = Math.min(this.totalPages, start + totalToShow - 1);
  
    if (end - start < totalToShow - 1) {
      start = Math.max(1, end - totalToShow + 1);
    }
  
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    return pages;
  }

  calcProgress(voteAverage: number): number {
    const percentage = (voteAverage / 10) * 113;
    return 113 - percentage;
  }
}