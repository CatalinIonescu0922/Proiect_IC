import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RegisterData } from '../shared/registerData';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  imports: [NavBarComponent, FooterComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  
  constructor(private profileService : ProfileService) { }
   userData : RegisterData | null = null;
  ngOnInit(): void {
     this.profileService.getProfile()
     .subscribe({
        next : (data) => this.userData = data,
        error : (err) => console.error('Failed to fetch profile', err)
     });
     console.log(this.userData?.PR_arm);
     console.log(this.userData?.PR_leg_press);
  }
}
