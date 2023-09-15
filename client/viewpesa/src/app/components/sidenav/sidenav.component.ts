import { Component, Output, EventEmitter } from '@angular/core';
import { navbarData } from './nav-data';
import { faCashRegister, faChartSimple, faUser } from '@fortawesome/free-solid-svg-icons';


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

