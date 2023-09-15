import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Emitters } from 'src/app/components/emitters/emitter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getHomeClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'home-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'home-md-screen';
    }
    return styleClass;
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get('http://localhost:4000/api/user', {
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
