import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userName: string = 'John Doe';
  userBio: string = 'Passionate about fitness and teamwork!';
  
  constructor() { }

  ngOnInit(): void {
  }

 

}
