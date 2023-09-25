import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { transition } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TransactService {

  constructor(private apiService: ApiService) { 

  }

  getTransactions(transactions: any){
    return this.apiService.getTransactions(transactions);

  }

  deleteTransaction(transactions: any){}
}
