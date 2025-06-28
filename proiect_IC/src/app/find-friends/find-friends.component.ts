import { Component, OnInit } from '@angular/core';
import { SendRequestService, BuddyRequest, UserProfile } from '../services/find-friends.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  imports: [CommonModule, NavBarComponent, FooterComponent],
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit {
  currentUserId!: number;

  sentRequests: BuddyRequest[] = [];
  receivedRequests: BuddyRequest[] = [];

  sentUsersMap: { [id: number]: UserProfile } = {};
  receivedUsersMap: { [id: number]: UserProfile } = {};

  isLoading = false;
  error = '';

  constructor(private sendReqService: SendRequestService) {}

  ngOnInit() {
    this.currentUserId = this.getUserId();
    this.loadRequestsAndUsers();
  }

  getUserId(): number {
    const id = localStorage.getItem('userID');
    if (!id) {
      throw new Error('User not logged in');
    }
    return parseInt(id, 10);
  }
  updateRequestStatus(req: BuddyRequest, status: 'accepted' | 'rejected') {
    this.sendReqService.updateRequestStatus(req.sender_id, req.receiver_id, status).subscribe({
      next: (res) => {
        // Optionally update local status so UI reflects change immediately
        req.status = status;
        // Clear any previous errors
        this.error = '';
      },
      error: (err) => {
        console.error('Failed to update request status', err);
        this.error = 'Failed to update request status';
      }
    });
  }
  

  async loadRequestsAndUsers() {
    this.isLoading = true;
    this.error = '';
    try {
      // Fetch sent and received requests in parallel
      const [sent, received] = await Promise.all([
        this.sendReqService.getSentRequests(this.currentUserId).toPromise(),
        this.sendReqService.getReceivedRequests(this.currentUserId).toPromise()
      ]);

      this.sentRequests = sent ?? [];
      this.receivedRequests = received ?? [];

      // Get unique user IDs from sent and received requests
      const sentUserIds = Array.from(new Set((sent ?? []).map(r => r.receiver_id)));
      const receivedUserIds = Array.from(new Set((received ?? []).map(r => r.sender_id)));
      
      if (sentUserIds.length > 0) {
        this.sendReqService.getUsersByIds(sentUserIds).subscribe({
          next: (sentUsers) => {
            this.sentUsersMap = {};
            sentUsers.forEach(user => {
              if (user && user.id != null) {
                this.sentUsersMap[user.id] = user;
              }
            });
          },
          error: (err) => {
            console.error('Failed to load sent users', err);
            this.error = 'Failed to load sent users';
          }
        });
      } else {
        // No sent users to load, initialize empty map
        this.sentUsersMap = {};
      }
      
      if (receivedUserIds.length > 0) {
        this.sendReqService.getUsersByIds(receivedUserIds).subscribe({
          next: (receivedUsers) => {
            this.receivedUsersMap = {};
            receivedUsers.forEach(user => {
              if (user && user.id != null) {
                this.receivedUsersMap[user.id] = user;
              }
            });
          },
          error: (err) => {
            console.error('Failed to load received users', err);
            this.error = 'Failed to load received users';
          }
        });
      } else {
        // No received users to load, initialize empty map
        this.receivedUsersMap = {};
      }
      

      this.isLoading = false;
    } catch (err) {
      this.error = 'Failed to load requests or user data.';
      this.isLoading = false;
      console.error(err);
    }
  }
}
