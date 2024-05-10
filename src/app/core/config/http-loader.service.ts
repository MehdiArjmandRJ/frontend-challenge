import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoadingContextModel } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {
  private loadingList: LoadingContextModel[] = [];
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public currentLoadingFlag = false;

  constructor() {
    this.isLoading
    .pipe(
      tap({
        next: (val: boolean) => {
          this.currentLoadingFlag = val;
        }
      })
    )
    .subscribe();
  }

  loadingStatee(value: boolean) {
    this.currentLoadingFlag = value;
  }

  get loadingState(): boolean {
    return this.currentLoadingFlag;
  }

  addLoadingListContext(context: LoadingContextModel) {
    this.isLoading.next(true);
    this.loadingList.push(context);
  }

  removeLoadingListContext(context: LoadingContextModel) {
    this.loadingList.forEach((item: LoadingContextModel, index: number) => {
      if (item.key === context.key) {
        this.loadingList.splice(index, 1);
      }
    });
    if (this.loadingList.length === 0) {
      this.isLoading.next(false);
    }
  }
}
