import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GymMembersService } from '../services/gym-members.service';
import { User } from '../shared/user';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-gym-members',
  templateUrl: './gym-members.component.html',
  imports: [CommonModule,FooterComponent,NavBarComponent],
  styleUrls: ['./gym-members.component.css']
})
export class GymMembersComponent implements OnInit {
  gymID!: string;
  gymName = '';
  members: User[] = [];
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GymMembersService
  ) {}

  ngOnInit(): void {
    this.gymID = this.route.snapshot.paramMap.get('gymID')!;
    this.gymName = history.state.gymName || 'this gym';

    this.service.getMembers(this.gymID).subscribe({
      next: (data) => {
        this.members = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(["/login"])
        this.error = 'Could not load members.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/gyms']);
  }
}
