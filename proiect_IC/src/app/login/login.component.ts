import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NavBarComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private router : Router) { }

  changeToCreate_Account() :void {
    this.router.navigate(["/login/registerNow"]); 
}

}
