import { Component, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Store } from '@ngxs/store';
import { OrderRepository } from '@app/shared/modules/order/repository/Order';
import { OrderService } from '@app/shared/modules/order/services/order.service';
import { IOrderModel } from '@app/shared/modules/order/models/Orders-report';
import { OrdersStatusEnumeration } from '../../models/orders-status.enum';
import { INotification } from "@shared/modules/notification-receiver/notification.interface";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements ICellRendererAngularComp {
  order: IOrderModel;
  orderDetails: IOrderModel[];

  constructor(
    private orderRepo: OrderRepository,
    private orderService: OrderService,
    private store: Store,
    @Inject('notificationToastService') private toaster: INotification
  ) { }

  agInit(params: ICellRendererParams): void {
    this.order = params.data;
  }

  refresh(params: ICellRendererParams): boolean {
    this.order = params.data;
    return true;
  }

  getOrderDetail() {
    this.orderRepo.getOrderDetails(this.order.id).subscribe(response => {
      this.orderDetails = response.result;
    });
  }

  getOrderStatus(order): string {
    if (Number(order.orderStatus) === 13 && order.errorMessage) {
      return (
        OrdersStatusEnumeration.get(Number(order.orderStatus)).title +
        `(${order.errorMessage})`
      );
    } else {
      return OrdersStatusEnumeration.get(Number(order.orderStatus)).title;
    }
  }

}
