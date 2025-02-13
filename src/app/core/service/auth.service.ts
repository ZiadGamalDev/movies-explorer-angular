import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = 'https://ecommerce.routemisr.com/api/v1/auth/';

  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signup', userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signin', userData);
  }
}
