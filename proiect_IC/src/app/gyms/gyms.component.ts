import { Component, OnInit} from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-gyms',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './gyms.component.html',
  styleUrl: './gyms.component.css'
})
export class GymsComponent {
  gyms: any[] = []; 

}
