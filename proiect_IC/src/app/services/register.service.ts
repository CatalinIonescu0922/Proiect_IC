import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterData }  from '../app/shared/registerData'
import { enviroment } from './shared/enviroment';
@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  
  private apiUrl = enviroment.backend_api + "/register-now"; // adapt if your route is different

  constructor(private http: HttpClient) {}

  registerUser(data: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
