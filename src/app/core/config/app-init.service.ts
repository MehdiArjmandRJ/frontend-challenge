import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppInitService {
  private authorize = new BehaviorSubject<boolean>(true);
  token!: string;

  constructor() {
   
  }

  InitApp(): Observable<boolean> {
    return this.authorize;
  }

}
