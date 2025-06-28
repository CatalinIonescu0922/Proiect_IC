import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BuddyRequest {
  id: number;
  sender_id: number;
  receiver_id: number;
  status: string;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  profile_photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class SendRequestService {
  private apiUrl = 'http://localhost:3000'; // adjust base URL

  constructor(private http: HttpClient) {}

  getSentRequests(senderId: number): Observable<BuddyRequest[]> {
    return this.http.get<BuddyRequest[]>(`${this.apiUrl}/all-send-req/${senderId}`);
  }

  getReceivedRequests(receiverId: number): Observable<BuddyRequest[]> {
    return this.http.get<BuddyRequest[]>(`${this.apiUrl}/all-receive-req/${receiverId}`);
  }

  getUsersByIds(userIds: number[]): Observable<UserProfile[]> {
    const params = new HttpParams().set('userIds', userIds.join(','));
    return this.http.get<UserProfile[]>(`${this.apiUrl}/get-users`, { params });
  }
  updateRequestStatus(senderId: number, receiverId: number, status: 'accepted' | 'rejected'): Observable<any> {
    const body = { sender_id: senderId, receiver_id: receiverId, status };
    return this.http.post(`${this.apiUrl}/requests/update-status`, body);
  }
}
