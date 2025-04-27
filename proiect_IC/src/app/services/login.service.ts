import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from './shared/enviroment';
import { LoginData } from './shared/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = enviroment.backend_api + "/login";

  constructor(private http: HttpClient) {}

  loginUser(data: LoginData): Observable<any> {
    return this.http.post(this.apiUrl, data, { withCredentials: true });
  }
}
