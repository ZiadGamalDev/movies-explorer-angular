import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interface/Movie';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<Movie>(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=fa07e39104e769e58916910a20a647c9`
    );
  }
}
