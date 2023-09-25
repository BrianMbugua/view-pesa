import { Component, Output, EventEmitter } from '@angular/core';
import { navbarData } from './nav-data';
import { faCashRegister, faChartSimple, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  currentUser: User = {};
  
  constructor(private authService: AuthService, private actRoute: ActivatedRoute) {
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // console.log("Snapshot id ", id)
    // this.authService.getUserProfile(id).subscribe((res) => {
    //   this.currentUser = res;
      
    //   console.log("Response ", this.currentUser._id)
     
    // });


    
  }
  
  ngOnInit() {

    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log("Snapshot id ", id)
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res;
      
      console.log("Response ", this.currentUser._id)
     
    });

  }

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean = false;
  screenWidth: 0 ;
  navData = navbarData
  
  toggelCollapse():void {
    this.collapsed =!this.collapsed;
    this.onToggleSidenav.emit({
      screenWidth: this.screenWidth,
      collapsed: this.collapsed
    });
  }

  closeSidenav():void {
    this.collapsed = false;
    this.onToggleSidenav.emit({
      screenWidth: this.screenWidth,
      collapsed: this.collapsed
    });
  }

  iconList = [
    {
      
      faCashRegister,
      faChartSimple,
      faUser
    
  }
  ]


  
    


}

