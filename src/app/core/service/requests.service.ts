import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interface/Movie';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<Movie>(
      `${environment.baseURL}/${movieId}?api_key=${environment.apiKey}`
    );
  }

  getRecommendations(movieId: number): Observable<any> {
    return this.http.get<Movie>(
      `${environment.baseURL}/${movieId}/recommendations?api_key=${environment.apiKey}`
    );
  }

  getNowPlayingMovies(page: number): Observable<any> {
    return this.http.get<Movie>(
      `${environment.baseURL}/now_playing?api_key=${environment.apiKey}&page=${page}`
    );
  }

  // Updated filterMovies method with corrected URL parameters
  filterMovies(searchTerm: string, page: number = 1): Observable<any> {
    return this.http.get<Movie>(
      `https://api.themoviedb.org/3/search/movie?api_key=${environment.apiKey}&query=${searchTerm}&page=${page}`
    );
  }
}
