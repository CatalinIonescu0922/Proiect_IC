import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_day: string;
  PR_arm: number;
  PR_bench_press: number;
  PR_leg_press: number;
  description: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3000/api/register'; // adapt if your route is different

  constructor(private http: HttpClient) {}

  registerUser(data: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
