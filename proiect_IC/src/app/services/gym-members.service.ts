import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class GymMembersService {
  private baseUrl = 'http://localhost:3000/gyms'; // sau URL-ul tău de productie

  constructor(private http: HttpClient) {}

  getMembers(gymID: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${gymID}/members`,{withCredentials : true});
  }
}
