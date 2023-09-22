import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService){}
  user = new User();

  onLogin(){
    debugger

    this.api.onLogin(this.user).subscribe((res: any) => {
      console.log('res', res)
      localStorage.setItem('token', res.token)
    })
  }
}
