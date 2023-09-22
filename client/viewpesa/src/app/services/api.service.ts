import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  
  onLogin(obj:any): Observable<any> {
    return this.httpClient.post('http://localhost:4000/api/users/loginUser', obj)
  }
}
