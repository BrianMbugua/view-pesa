import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/components/emitters/emitter';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  authenticated = false;

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit():void {
    Emitters.authEmitter.subscribe((auth:boolean) => {
      this.authenticated = auth;
    })
  }

  logout():void {
    this.http.post("http://localhost:4000/api/logout",{},{withCredentials: true})
    .subscribe(()=> this.authenticated = false)
    
    this.router.navigate(['/login']);
  }
}
