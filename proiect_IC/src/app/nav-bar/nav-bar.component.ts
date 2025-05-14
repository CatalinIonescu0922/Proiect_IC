import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogOutService } from '../services/log-out.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
   isLoggedIn$: Observable<boolean> ;
  constructor(private router: Router, private logOutService : LogOutService) {
    this.logOutService.checkLogin();
    this.isLoggedIn$=this.logOutService.isLoggedIn$;
  }
  changeToProfile() {
    this.router.navigate(['/profile']); // make sure route matches
  }
  changeToMake_Friends() {
    this.router.navigate(['/makeFriends']); // make sure route matches
  }

  changeToGyms() {
    this.router.navigate(["/gyms"]); // make sure route matches
  }

  changeToHomePage() {
    this.router.navigate(["/"]); // make sure route matches
  }

  changeToAbout_Us() {
    this.router.navigate(["/about-us"]); // make sure route matches
  }
  logOut(){
    this.logOutService.logout().subscribe({
      next: () => this.router.navigate(["/login"]),
      error: (err) => console.error("Logout failed",err)
    });
  }
}
