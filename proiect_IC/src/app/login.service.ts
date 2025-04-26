import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/login'; // adapt if needed

  constructor(private http: HttpClient) {}

  loginUser(data: LoginData): Observable<any> {
    return this.http.post(this.apiUrl, data, { withCredentials: true });
  }
}
