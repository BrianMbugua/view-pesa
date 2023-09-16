import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  transactionData: any;
  transactionData$: any;
  constructor(private dataService: DataService){

  }

  
  ngOnInit(): void {
    this.transactionData$ = this.dataService.getTransaction()
    
  }

}
