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
  selectedPhotoProfile? : File
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
  onFileSelected(event : Event){
    const input  = event.target as HTMLInputElement
    if(input.files && input.files.length > 0){
      this.selectedPhotoProfile = input.files[0];   
    } else{
      this.selectedPhotoProfile = undefined;
    }
  }
  onSubmit(form: NgForm) {
    if (!form.valid){
      console.warn("Please fill of the data that is required ");
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append('email', form.value.email);
    formDataToSend.append('password', form.value.password);
    formDataToSend.append('first_name', form.value['first-name']);
    formDataToSend.append('last_name', form.value['last-name']);
    formDataToSend.append('birth_day', form.value['birth-date']);
    formDataToSend.append('PR_arm', String(form.value['pr-arm']));
    formDataToSend.append('PR_bench_press', String(form.value['pr-bench-press']));
    formDataToSend.append('PR_leg_press', String(form.value['pr-leg-press']));
    formDataToSend.append('description', form.value.description);
    formDataToSend.append('gender', form.value.gender);
    if (this.selectedPhotoProfile){
      formDataToSend.append('profile_photo', this.selectedPhotoProfile, this.selectedPhotoProfile.name)
    }
    formDataToSend.append('gym_id',this.selectedGym)

    this.registerService.registerUser(formDataToSend).subscribe({
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
