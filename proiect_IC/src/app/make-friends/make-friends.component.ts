import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-make-friends',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './make-friends.component.html',
  styleUrl: './make-friends.component.css'
})
export class MakeFriendsComponent {

}
