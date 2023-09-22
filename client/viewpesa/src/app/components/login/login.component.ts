import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/components/emitters/emitter';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',

    })
  }

  ValidateEmail = (email: any) => {

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
  // onLogin(){
  //   let user = this.form.getRawValue();
  //   console.log(user);
  //   this.authService.onLogin(user)

  // }

  submit(): void {
    let user = this.form.getRawValue();
    console.log(user);

    if (user.email == "" || user.password == "") {
      Swal.fire("Error", "Please enter all the required fields", "error")
    }
    else if (!this.ValidateEmail(user.email)) {
      Swal.fire("Error", "Please enter a valid email", "error")
    } else {

      this.authService.login(user).subscribe((res) => {
        
        this.router.navigate(['/transactions'])
      });


      // this.http.post("http://localhost:4000/api/users/loginUser", user, { withCredentials: true })
      //   .subscribe(
      //     (res) => {
      //       console.log(res)
      //       this.router.navigate(['/transactions'])
      //       Emitters.authEmitter.emit(true);
      //     }, 
      //     (error) => {
      //     Swal.fire("Error", error.error.message, "error")
      //     Emitters.authEmitter.emit(false);
      //   })
    }
  }
}

 