import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register-now',
  imports: [NavBarComponent,FooterComponent],
  templateUrl: './register-now.component.html',
  styleUrl: './register-now.component.css'
})
export class RegisterNowComponent {

}
