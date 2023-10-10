import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { TransactService } from 'src/app/services/transact.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  form: FormGroup;
  transactionData$: any;
  showForm: boolean = false;

  constructor(private dataService: DataService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService, private transactService: TransactService) {

  }




  errorMessage(): void {
    Swal.fire("Error", "Error", "error")
  }

  showTransactionForm(): void {
    this.showForm = true;
  }
  hideTransactionForm(): void {
    this.showForm = false;
  }
  reloadPage() {
    window.location.reload()
  }

  submit(): void {
    let transaction = this.form.getRawValue();
    console.log("TransactComp: Form Data: ", transaction);

    if (transaction.category == "" || transaction.amount == "" || transaction.wallet == "") {
      Swal.fire("Error", "Please enter all required transaction details", "error")
    } else {
      this.apiService.addTransactions(transaction)

        .subscribe(() => this.router.navigate(['/visual-insights']))

      Swal.fire("Success", "Transactions successfully added", "success")
        ,
        (err: any) => {
          Swal.fire("Error", err.error.message, "error")
        }
    }

  }

  getTransactions() {
    this.transactionData$ = this.transactService.getTransactions()
    this.form = this.formBuilder.group({
      wallet: "",
      category: "",
      amount: "",
      description: ""
    })
  }

  deleteTransaction(): void {
    // this.transactService.deleteTransaction()
  }

  ngOnInit(): void {
    this.getTransactions() 
  }

}
