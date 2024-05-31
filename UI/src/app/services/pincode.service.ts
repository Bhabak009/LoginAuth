import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  private url='https://api.postalpincode.in/pincode/'
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient) { }
  checkTerritory(pinCode:string):Observable<any>{
     let apiUrl=`${this.url}`+pinCode;
    return this.http.get<any>(apiUrl);
  }
}
