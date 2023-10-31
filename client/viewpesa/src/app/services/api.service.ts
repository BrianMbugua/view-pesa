import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { 
    
  }

  
  onLogin(obj:any): Observable<any> {
    return this.httpClient.post('http://localhost:4000/api/users/loginUser', obj)
  }

  onRegister(obj:any): Observable<any> {
    return this.httpClient.post('http://localhost:4000/api/users/registerUser', obj)
  }

  public getTransactions(): Observable<any> {
    // console.log("Get transaction client side ",transaction)
    return this.httpClient.get('http://localhost:4000/api/transactions').pipe(
      catchError((err, caught) => {
        console.log(err);
        return caught;
      })
    );
    
  }

  addTransactions(transaction: any): Observable<any> {
    
    return this.httpClient.post('http://localhost:4000/api/transactions', transaction)
  }

  getUserInfo(): Observable<any> {
    return this.httpClient.get(`http://localhost:4000/api/users/:id`)
  }

  addWallet(wallet: any): Observable<any>{
    console.log("APIServiceTS: Wallet heading to backend ", wallet)
    return this.httpClient.post(`http://localhost:4000/api/wallets`, wallet)
  }

  getWallets(wallets: any): Observable<any>{
    return this.httpClient.get(`http://localhost:4000/api/wallets`, wallets)
  }
  deleteWallet(id:any){
    return this.httpClient.delete(`http://localhost:4000/api/wallets/${id}`)
  }
}
