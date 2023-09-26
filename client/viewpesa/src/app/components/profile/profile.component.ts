import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User = {};
  public fetchId: any;
  
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    
    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log("Profile page id ", id)
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res;
      this.fetchId = res._id;
      
    });
  }
  ngOnInit() {

  }
}
