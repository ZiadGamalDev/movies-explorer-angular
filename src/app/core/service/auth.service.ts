import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = 'https://ecommerce.routemisr.com/api/v1/auth/';
  userInfo:any;
  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signup', userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signin', userData);
  }

  decodeUser():void{


    const token=localStorage.getItem('etoken')
    if(token!=null){

      this.userInfo=jwtDecode(token)
      console.log(this.userInfo)
    }

  }
 
}
