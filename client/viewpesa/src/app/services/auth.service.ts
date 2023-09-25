import { Injectable } from '@angular/core';
import { HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_NAME = 'user_auth';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  public obtainID: string = "";

  constructor(private apiService: ApiService, private router: Router, private http:HttpClient) {

    //in production check expiration before setting token state
    this._isLoggedIn$.next(!!this.getToken);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(this.TOKEN_NAME);
    return authToken !== null ? true : false;
  }

  user = new User();

  register(user:any) {
    return this.apiService.onRegister(user).pipe(
      tap((res:any) => {
        localStorage.setItem(this.TOKEN_NAME, res.token);
        
      }
    ));
  }


  login(user: any) {
    return this.apiService.onLogin(user).pipe(
      tap((res: any) => {
        localStorage.setItem(this.TOKEN_NAME, res.token);
        

        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          
          this.router.navigate(['my-profile/' + res._id]);
        });

        this._isLoggedIn$.next(true);

      })
    );
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `http://localhost:4000/api/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
     
        this.obtainID = id;
        return res || {};
        
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