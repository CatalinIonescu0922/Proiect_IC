import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GymMembersService } from '../services/gym-members.service';
import { User } from '../shared/user';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { SendRequestService } from '../services/send-request.service';

@Component({
  selector: 'app-gym-members',
  templateUrl: './gym-members.component.html',
  imports: [CommonModule, FooterComponent, NavBarComponent],
  styleUrls: ['./gym-members.component.css']
})
export class GymMembersComponent implements OnInit {
  gymID!: string;
  gymName = '';
  members: User[] = [];
  isLoading = true;
  error = '';
  curentUserId: number = this.getUSerID();

  // Track sent requests by receiver id
  sentRequests: { [key: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GymMembersService,
    private sendReq: SendRequestService
  ) {}

  ngOnInit(): void {
    this.gymID = this.route.snapshot.paramMap.get('gymID')!;
    this.gymName = history.state.gymName || 'this gym';

    this.loadSentRequestsAndMembers();
  }

  loadSentRequestsAndMembers() {
    this.sendReq.getSentRequests(this.curentUserId).subscribe({
      next: (sentRequests) => {
        this.sentRequests = {};
        sentRequests.forEach(req => {
          this.sentRequests[req.receiver_id] = true;
        });
        this.loadMembers();
      },
      error: (err) => {
        console.error('Failed to fetch sent requests', err);
        this.sentRequests = {};
        this.loadMembers();
      }
    });
  }

  loadMembers() {
    this.service.getMembers(this.gymID).subscribe({
      next: (data) => {
        this.members = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/login']);
        this.error = 'Could not load members.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/gyms']);
  }

  sendRequest(send_id: number, receive_id: number) {
    this.sendReq.sendRequest(send_id, receive_id).subscribe({
      next: () => {
        this.sentRequests[receive_id] = true; // Update state live
      },
      error: (err) => {
        console.error('Failed to send request:', err);
      }
    });
  }

  hasSentRequest(memberId: number): boolean {
    return !!this.sentRequests[memberId];
  }

  getUSerID(): number {
    const stringID = localStorage.getItem('userID');
    if (stringID === null) {
      throw new Error('must be set inside localStorage');
    }
    return parseInt(stringID, 10);
  }
}
