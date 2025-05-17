import { Injectable } from '@angular/core';
import { gymModel } from '../shared/gymModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../shared/enviroment';
@Injectable({
  providedIn: 'root'
})
export class GymsService {

  constructor(private http : HttpClient) { }

  getGyms() : Observable<gymModel[]> {
    return this.http.get<gymModel[]>(`${enviroment.backend_api}/gyms`,{withCredentials: true})
  }
}
