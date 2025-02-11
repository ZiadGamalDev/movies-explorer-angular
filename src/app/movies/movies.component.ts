import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../core/service/requests.service';
import { Movie } from '../core/interface/Movie';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../core/pipe/truncate.pipe';
import { WishlistService } from '../core/service/wishlist.service';
import { UpToTopComponent } from '../up-to-top/up-to-top.component';
import { LanguagesService } from '../core/service/languages.service';

@Component({
  selector: 'app-movies',
  imports: [RouterModule, CommonModule, TruncatePipe, UpToTopComponent, FormsModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  isInWishlist: boolean = false;
  selectedLanguage: string = 'en-US';
  searchTerm: string = '';

  constructor(
    private requests: RequestsService,
    private _wishlistService: WishlistService,
    private languageService: LanguagesService
  ) {}

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe((lang) => {
      this.selectedLanguage = lang;
      this.fetchMoviesWithLanguage();
    });

    this.fetchMovies();
  }

  fetchMovies() {
    this.requests.getNowPlayingMovies(this.currentPage).subscribe((res) => {
      this.movies = res.results;
      this.filteredMovies = res.results;
      this.totalPages = res.total_pages;
    });
  }

  fetchMoviesWithLanguage() {
    this.requests.getMoviesWithLanguages(this.selectedLanguage).subscribe((res) => {
      this.movies = res.results;
      this.filteredMovies = [...this.movies];
    });
  }

  filterMovies() {
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      this.filteredMovies = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(term)
      );
    } else {
      this.filteredMovies = [...this.movies];
    }
  }

  toggleWishlist(movie: Movie): void {
    if (this._wishlistService.isInWishlist(movie.id)) {
      this._wishlistService.removeFromWishlist(movie.id);
    } else {
      this._wishlistService.addToWishlist(movie);
    }
  }

  getHeartIconClass(movie: Movie): string {
    return `fa-heart favorite-icon me-5 ${
      this._wishlistService.isInWishlist(movie.id) ? 'fa-solid' : 'fa-regular'
    }`;
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
