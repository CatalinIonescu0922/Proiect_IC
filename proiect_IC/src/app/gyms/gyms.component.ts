import { Component, OnInit} from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { GymsService } from '../services/gyms.service';
import { gymModel } from '../shared/gymModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gyms',
  imports: [NavBarComponent, FooterComponent,CommonModule],
  templateUrl: './gyms.component.html',
  styleUrl: './gyms.component.css'
})
export class GymsComponent {
  gyms : gymModel[] = []
  constructor (private gymService : GymsService, private router : Router){}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.gymService.getGyms()
    .subscribe({
      next : (data) => this.gyms = data, 
      error : (err) => console.error("not able to get gyms",err)
    })
  }

  gymDetails(id : number){
      this.router.navigate(["gyms",id])
  }

}
