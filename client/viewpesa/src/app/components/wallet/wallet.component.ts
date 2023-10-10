import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { TransactService } from 'src/app/services/transact.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

  form: FormGroup;
  showForm: boolean = false;
  walletData$: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private apiService: ApiService, private transactService: TransactService) { }

  errorMessage(): void {
    Swal.fire("Error", "Error", "error")
  }
  reloadPage() {
    window.location.reload()
  }
  displayForm(){
    this.showForm = true;
  }
  hideForm(){
    this.showForm = false;
  }
  submit(): void {
    let wallet = this.form.getRawValue();

    if (wallet.name == "" || wallet.amount == "") {
      Swal.fire("Error", "Please enter both name and amount", "error")
    } else {

      this.apiService.addWallet(wallet)
      this.reloadPage()
      Swal.fire("Success", "Wallet Added", "success"),

        (err: any) => {
          Swal.fire("Error", err.error.message, "error")
        }
    }
  }

  getWallets() {
    this.walletData$ = this.transactService.getWallets()
    this.form = this.formBuilder.group({
      name: "",
      amount: "",
      date: "",
      description: ""
    })
  }

  deleteWallet(){
    let id = this.walletData$.get("id")
     this.transactService.deleteWallet()
  }

  ngOnInit(): void {
    this.getWallets() 
  }

}
