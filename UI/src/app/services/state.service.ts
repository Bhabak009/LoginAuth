import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../models/state';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {
  }

  addState(state: State): Observable<number> {
    return this.http.post<number>('https://localhost:7295/api/State', state, { headers: this.headers });
  }
  // login(state:State):Observable<any>{
  //   debugger;
  //   // const header=new HttpHeaders().set('content-type','application/json');
  //   return this.http.post<any>('https://localhost:7125/api/auth/login',JSON.stringify(state),{headers:this.headers,withCredentials:true});
  // }
}