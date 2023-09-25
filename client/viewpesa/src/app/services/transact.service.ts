import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { transition } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TransactService {

  constructor(private apiService: ApiService) { 

  }

  getTransactions(){
    return this.apiService.getTransactions("http://localhost:4000/api/transactions");

  }

  deleteTransaction(transactions: any){}
}
