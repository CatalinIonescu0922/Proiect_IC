import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router: Router) {}
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
}
