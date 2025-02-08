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
}
