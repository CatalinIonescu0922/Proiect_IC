import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterData } from '../shared/registerData';
import { Observable } from 'rxjs';
import { enviroment } from '../shared/enviroment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = enviroment.backend_api + "/profile"
  constructor(private http : HttpClient) { }
  getProfile () : Observable<RegisterData>{
    return this.http.get<RegisterData>(`${this.apiUrl}`,{withCredentials : true})
  }
}
