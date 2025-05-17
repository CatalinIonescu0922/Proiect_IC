import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GymsService } from '../services/gyms.service';
import { gymModel } from '../shared/gymModel';
@Component({
  selector: 'app-register-now',
  imports: [NavBarComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent {
  selectedGym=""
  gyms : gymModel[] = [];
  constructor(private registerService: RegisterService , private router : Router, private gymService : GymsService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.gymService.getGyms()
    .subscribe({
      next : (data) => this.gyms = data,
      error : (err) => console.error("not able to get gyms",err)
    })
  }

  onSubmit(form: NgForm) {
    if (!form.valid){
      console.warn("Please fill of the data that is required ");
      return;
    }
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
