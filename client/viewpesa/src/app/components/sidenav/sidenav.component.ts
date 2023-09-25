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
  obtainID = this.authService.obtainID
  constructor(private authService: AuthService, private actRoute: ActivatedRoute) {
    

    
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

  ngOnInit() {

    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res;
      
      console.log(this.currentUser._id)
    });

  }

  
    


}

