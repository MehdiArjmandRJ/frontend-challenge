import {Observable} from 'rxjs';

export interface FacadeLoginModel<T=object> {
    userInfoData$:Observable<T>;
}
