import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/components/emitters/emitter';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'viewpesa';

  authenticated = false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private http: HttpClient, private router: Router){}

  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


  logout():void {
    this.http.post("http://localhost:4000/api/logout",{},{withCredentials: true})
    .subscribe(()=> this.authenticated = false)
    
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.http
      .get('http://localhost:4000/api/user', {
        withCredentials: true
      })
      .subscribe((res: any) => {
        Emitters.authEmitter.emit(true);
      },
        (err) => {
          Emitters.authEmitter.emit(false);
        }
      );

      Emitters.authEmitter.subscribe((auth:boolean) => {
        this.authenticated = auth;
      })
  }
}


