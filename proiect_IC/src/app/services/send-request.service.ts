import { Injectable } from '@angular/core';
import { enviroment } from '../shared/enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SendRequestService {
  private apiUrl = enviroment.backend_api + "/send-request";
  constructor(private http : HttpClient) { }

  sendRequest(sender_id : number , receiver_id: number): Observable<any>{
    return this.http.post(this.apiUrl, {sender_id, receiver_id}); 
  }
  getSentRequests(sender_id: number): Observable<{ receiver_id: number }[]> {
    return this.http.get<{ receiver_id: number }[]>(`${this.apiUrl}/${sender_id}`);
  }
  updateRequestStatus(senderId: number, receiverId: number, status: 'accepted' | 'rejected'): Observable<any> {
    const body = { sender_id: senderId, receiver_id: receiverId, status };
    return this.http.post(`${this.apiUrl}/requests/update-status`, body);
  }
}
