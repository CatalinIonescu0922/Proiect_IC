import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GymsService } from '../services/gyms.service';
import { gymModel } from '../shared/gymModel';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  imports: [CommonModule,FooterComponent,NavBarComponent],
  styleUrls: ['./gyms.component.css']
})
export class GymsComponent implements OnInit {
  gyms: gymModel[] = [];

  constructor(private gymService: GymsService, private router: Router) {}

  ngOnInit(): void {
    this.gymService.getGyms().subscribe((data) => {
      this.gyms = data;
    });
  }

  gymDetails(gymID: number, gymName: string): void {
    this.router.navigate(['/gyms', gymID, 'members'], {
      state: { gymName: gymName }
    });
  }
}
