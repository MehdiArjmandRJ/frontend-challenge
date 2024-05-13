import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalErrorHandler {
  private isLoading = new BehaviorSubject<boolean>(false);
  public currentLoadingFlag = this.isLoading.asObservable();

  constructor() {
    this.changeLoadingFlag(false);
  }

  changeLoadingFlag(toggle: boolean) {
    this.isLoading.next(toggle);
  }

  handleError(reqUrl: string, error: HttpErrorResponse) {
    let errorMessage = '',
      err;

    if (error.status === 400) {
      if (typeof error.error === 'string' && JSON.parse(error.error)) {
        err = JSON.parse(error.error);
        errorMessage = this.findErrorDisplay();
      } else if (error.error.invalidParams) {
        err = error.error;
        errorMessage = this.findErrorDisplay();
      } else if (error.error.detail) {
        err = error.error;
        errorMessage = this.findErrorDisplay();
      }
    } else if (error.status === 403) {
      errorMessage = 'You have note permission';
    } else {
      errorMessage = 'Error';
    }

    // this.notificationService.error(errorMessage, null, { comeFrom: MessageChannel.Api });
  }

  private findErrorDisplay() {
    // const findTranslate = this.errorTranslator.find(e => e.error === error)?.display;
    return 'Error';
  }
}
