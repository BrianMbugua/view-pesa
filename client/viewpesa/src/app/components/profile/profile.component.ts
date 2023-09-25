import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUser: User = {};
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    
  }
  ngOnInit() {

    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log("Profile page id ", id)
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res;
      // console.log(this.currentUser._id)
    });

  }
}
