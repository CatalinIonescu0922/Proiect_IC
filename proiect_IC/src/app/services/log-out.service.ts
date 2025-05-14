import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../shared/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  private isLogedInSubject= new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean>= this.isLogedInSubject.asObservable();
  constructor(private http : HttpClient) {}

  logout(){
    return this.http.post(`${enviroment.backend_api}/logout`,{},{withCredentials: true});
  }
  checkLogin(){
      this.http.get(`${enviroment.backend_api}/check-log-in`,{withCredentials:true,observe:"response"}).subscribe({
        next:()=> {this.isLogedInSubject.next(true)},
        error:()=> {this.isLogedInSubject.next(false)} 
      })
  }
}
