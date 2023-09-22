import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/components/emitters/emitter';
import { AuthService } from './services/auth.service';

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

  constructor(private http: HttpClient, private router: Router, public authService: AuthService){}

  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


  logout():void {
    this.authService.logout();
  }

  ngOnInit() {
    this.http
      .get('http://localhost:4000/api/users', {
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


