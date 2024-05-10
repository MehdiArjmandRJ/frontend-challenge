import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HttpCancelService {
  private pendingHTTPRequests$ = new Subject<void>();

  // Cancel Pending HTTP calls
  cancelPendingRequests() {
    this.pendingHTTPRequests$.next();
  }

  onCancelPendingRequests() {
    return this.pendingHTTPRequests$.asObservable();
  }

}
