import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, tap, map, shareReplay } from 'rxjs';
import { ITradeModel } from '../../../../../../shared/modules/order/models/Orders-report';
import { environment } from '@env/environment';
import { OrderRepository } from '@app/shared/modules/order/repository/Order';

@Injectable({
  providedIn: 'root'
})
export class TradesStoreService {
  private readonly pathPrefix: string = 'trade';
  private subject = new BehaviorSubject<ITradeModel[]>([]);

  trades$: Observable<ITradeModel[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private ordersReportRepository: OrderRepository) { }

  getCustomerTrades(filter?: any) {
    this.ordersReportRepository.getCustomerTrades(filter).pipe(
      map(response => response.result),
      shareReplay(),
      tap(trades => {
        this.subject.next(trades);
      })
    ).subscribe();
  }

  getTrades() {
    return this.trades$;
  }

  filterByUserInput(queryParams: {
    FromDate?: string;
    ToDate?: string;
    OrderSide?: number;
    ISIN?: string;
  }): Observable<any> {
    const path = `${environment.orderUrl}/${this.pathPrefix}/GetCustomerTrades`;

    let params = new HttpParams();

    if (queryParams.FromDate) {
      params = params.set('FromDate', queryParams?.FromDate);
    }

    if (queryParams.ToDate) {
      params = params.set('ToDate', queryParams?.ToDate);
    }

    if (queryParams.ISIN) {
      params = params.set('ISIN', queryParams?.ISIN);
    }

    params = params.set(
      'OrderSide',
      queryParams?.OrderSide ? queryParams?.OrderSide?.toString() : '0'
    );

    return this.http.get<any>(path, { params })
      .pipe(
        map(response => response.result),
        shareReplay(),
        tap(filteredData => {
          this.subject.next(filteredData);
        })
      );
  }
}
