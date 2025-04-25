import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [FooterComponent,NavBarComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(form: any) {
    const loginData = {
      email: form.value.email,
      password: form.value.password
    };

    this.loginService.loginUser(loginData).subscribe({
      next: (res) => {
        alert('Login successful!');
        this.router.navigate(['/home']); // or wherever you want to send user
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
        console.error(err);
      }
    });
  }

  changeToCreate_Account() {
    this.router.navigate(['/register-now']); // make sure route matches
  }
}
