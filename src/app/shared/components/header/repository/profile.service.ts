import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http: HttpClient ) {
  }

  get2fa(): Observable<boolean> {
    return this.http.get<boolean>(environment.idpBaseUrl + "/api/account/2fa")
  }
}
