import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_NAME = 'user_auth';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private apiService: ApiService, private router: Router) {

    //check expiration before setting token state
    this._isLoggedIn$.next(!!this.getToken);
  }

  user = new User();

  register(user:any) {
    return this.apiService.onRegister(user).pipe(
      tap((res:any) => {
        localStorage.setItem(this.TOKEN_NAME, res.token);
        // this._isLoggedIn$.next(true);
      }
    ));
  }

  login(user: any) {
    return this.apiService.onLogin(user).pipe(
      tap((res: any) => {
        localStorage.setItem(this.TOKEN_NAME, res.token);
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout() {
    let removeToken = localStorage.removeItem(this.TOKEN_NAME);
    if (removeToken == null) {
      this._isLoggedIn$.next(false);
      this.router.navigate(['login']);
    }
  }
}