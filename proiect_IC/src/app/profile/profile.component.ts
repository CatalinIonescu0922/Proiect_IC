import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RegisterData } from '../shared/registerData';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [NavBarComponent, FooterComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  
  constructor(private profileService : ProfileService , private router: Router) { }
   userData : RegisterData | null = null;
  ngOnInit(): void {
     this.profileService.getProfile()
     .subscribe({
        next : (data) => this.userData = data,
        error : (err) => {
          if(err.status === 401){
            this.router.navigate(["/login"])
          }
        }
     });
  }
}
