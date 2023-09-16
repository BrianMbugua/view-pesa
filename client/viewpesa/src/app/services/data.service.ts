import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getTransaction(){
    return this.httpClient.get("http://localhost:4000/api/transactions")
  }
  // editTransaction(){
  //   return this.httpClient.put("http://localhost:4000/api/transactions")
  // }
}
