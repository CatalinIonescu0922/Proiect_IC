import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-now',
  imports: [NavBarComponent,FooterComponent,FormsModule],
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent {

  constructor(private registerService: RegisterService , private router : Router) {}

  onSubmit(form: any) {
    const formData = {
      email: form.value.email,
      password: form.value.password,
      first_name: form.value['first-name'],
      last_name: form.value['last-name'],
      birth_day: form.value['birth-date'],
      PR_arm: Number(form.value['pr-arm']),
      PR_bench_press: Number(form.value['pr-bench-press']),
      PR_leg_press: Number(form.value['pr-leg-press']),
      description: form.value.description,
      gender: form.value.gender
    };

    this.registerService.registerUser(formData).subscribe({
      next: (response) => {
        alert('Account created successfully!');
        this.router.navigate(['/login']);
        console.log(response);
      },
      error: (error) => {
        alert('Error creating account: ' + error.error.message);
        console.error(error);
      }
    });
  }
}
