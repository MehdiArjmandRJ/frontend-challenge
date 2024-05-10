import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeRepositoryService {
  constructor( private httpClient: HttpClient ) {
  }
}
