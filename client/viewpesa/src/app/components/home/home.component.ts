import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Emitters } from 'src/app/components/emitters/emitter';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  isSideNavCollapsed = false;

  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get('http://localhost:4000/api/users', {
        withCredentials: true
      })
      .subscribe((res: any) => {
        this.message = ` Hi, ${res.username}`;
        Emitters.authEmitter.emit(true);
      },
        (err) => {
          this.message = "You are not logged in";
          Emitters.authEmitter.emit(false);
        }
      );
  }

  
}
