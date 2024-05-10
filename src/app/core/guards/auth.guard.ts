import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
class PermissionsService {

  constructor() { }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  // }
}

// export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => inject(PermissionsService).canActivate(next, state);
