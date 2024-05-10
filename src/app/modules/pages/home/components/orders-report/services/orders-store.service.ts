import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap, map, take } from 'rxjs';

import {
  IOrderModel,
  ICommissionModel,
  Result
} from '../../../../../../shared/modules/order/models/Orders-report';
import { OrderRepository } from '@app/shared/modules/order/repository/Order';
import { IAbstractApiResponse, ICommissionResponse } from '@app/shared/modules/order/models/Request-order';
import { ICommission } from '@shared/modules/order/models/order';
import { UtilitiesService } from '@app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class OrdersStoreService {
  private subject = new BehaviorSubject<IOrderModel[]>([]);
  private instrumentIdsSubject = new BehaviorSubject<string[]>([]);
  private instrumentCommissionSubject = new BehaviorSubject<ICommission[]>([]);

  inskeys: string[];
  entityCount: number;
  instrumentIds: string[];
  commissionsArr: ICommission[];
  pageSize = new BehaviorSubject<number>(10);
  orders$: Observable<IOrderModel[]> = this.subject.asObservable();
  instrumentIds$: Observable<string[]> = this.instrumentIdsSubject.asObservable();
  instrumentCommission$: Observable<ICommission[]> = this.instrumentCommissionSubject.asObservable();

  constructor(private ordersReportResository: OrderRepository, private utilityService: UtilitiesService) { }

  getCustomerOrders() {
    this.ordersReportResository.getCustomerOrders().pipe(
      tap((res) => {
        this.entityCount = res.result.entityCount;
      }),
      map((response: IAbstractApiResponse<Result>) => response.result.data),
      tap((orders: IOrderModel[]) => {
        const insKeys = this.getInsKeyFromOrders(orders);

        const dataToPost: ICommissionModel = {
          InsKeys: insKeys,
          SideType: 'All',
          CustomerType: 'Ordinary',
        };

        if (!insKeys?.length) {
          return;
        }

        this.ordersReportResository.getCommission(this.utilityService.getFilterValues(dataToPost)).pipe(
          take(1),
          map((commissionRes: ICommissionResponse) => commissionRes.data),
          tap({
            next: (commissionsArr: ICommission[]) => {
              this.commissionsArr = commissionsArr;
            },
            complete: () => {
              orders = orders.map((order) => {
                const orderSideString = order.orderSide === 1 ? 'Buy' : 'Sell';

                const matchingCommission = this.commissionsArr.find(
                  (commission) => (
                    commission.insKey === order.insKey &&
                    commission.sideType === orderSideString
                  )
                );
                if (matchingCommission) {
                  order = {
                    ...order,
                    commision: matchingCommission.totalCoefficient,
                  };
                  return order;
                } else {
                  order = {
                    ...order,
                    commision: 1,
                  };
                  return order;
                }
              });

              this.subject.next(orders);
            }
          })
        ).subscribe();
      })
    ).subscribe();
  }

  getOrders() {
    return this.orders$;
  }

  getInstrumentIds() {
    return this.instrumentIds$;
  }

  getInstrumentCommission() {
    return this.instrumentCommission$;
  }

  filterByOrderSide(orderSide) {
    return this.orders$.pipe(
      map((response) => {
        const sideOrdersArray = [];

        const sideOrders = response.filter(
          (obj) => obj.orderSide === orderSide
        );
        if (sideOrders.length > 0) {
          sideOrdersArray.push(...sideOrders);
        }

        return sideOrdersArray;
      })
    );
  }

  getAllActiveOrders() {
    return this.orders$.pipe(
      map(orders => {
        const activeOrders = orders.filter(obj => obj.isActive === true);
        return activeOrders;
      })
    );
  }

  private getInsKeyFromOrders(orders): any[] {
    const idsSet = new Set<string>();

    orders?.forEach((order) => {
      idsSet.add(order.insKey);
    });

    const ids = Array.from(idsSet);
    return ids;
  }
}
