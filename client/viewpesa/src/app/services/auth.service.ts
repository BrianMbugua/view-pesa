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
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService, private router: Router){
          const token = localStorage.getItem('user_auth'); 
          //check expiration before setting token state
          this._isLoggedIn$.next(!!token);      
  }  

  user = new User();

  login(user: any){
    return this.apiService.onLogin(user).pipe(
      tap((res: any) => {
        localStorage.setItem('user_auth', res.token);
        this._isLoggedIn$.next(true);
      })
    );
  }
}