import { Component, Inject, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Store } from '@ngxs/store';
import { OrderRepository } from '@app/shared/modules/order/repository/Order';
import { InsSelectedActions } from '@app/core/store/instrument-selected/instrument-selected.actions';
import { OrderActions } from '@app/shared/modules/order/store/order.action';
import { OrderService } from '@app/shared/modules/order/services/order.service';
import { IOrderModel } from '@app/shared/modules/order/models/Orders-report';
import { OverlayPanel } from 'primeng/overlaypanel';
import { tap } from 'rxjs';
import { INotification } from '@shared/modules/notification-receiver/notification.interface';

@Component({
  selector: 'app-order-actions',
  templateUrl: './order-actions.component.html',
  styleUrls: ['./order-actions.component.scss']
})
export class OrderActionsComponent implements ICellRendererAngularComp {
  @ViewChild('cancel') cancelOverlay: OverlayPanel;
  order: IOrderModel;
  isLoading = false;

  constructor(
    private orderRepo: OrderRepository,
    private orderService: OrderService,
    private store: Store,
    @Inject('notificationToastService') private toaster: INotification,
  ) { }

  agInit(params: ICellRendererParams): void {
    this.order = params.data;
  }

  refresh(params: ICellRendererParams): boolean {
    this.order = params.data;
    return true;
  }

  showCancelOrderOverlay(event) {
    if (this.order.isLock || !this.order.isActive) {
      this.toaster.warning('در حال حاضر اجازه حذف این سفارش وجود ندارد!');
      return;
    }

    this.cancelOverlay.show(event);
  }

  cancelOrder(): void {
    if (!this.isLoading){
      this.isLoading = true;
      this.orderRepo.delete(this.order.id).pipe(
        tap({
          finalize: () => {
            this.isLoading = false;
            this.cancelOverlay.hide();
          }
        })
      ).subscribe();
    }
  }

  editOrder(): void {
    if (this.order.isLock || !this.order.isActive) {
      this.toaster.warning('در حال حاضر اجازه ویرایش این سفارش وجود ندارد!');
      return;
    }

    this.store.dispatch(new InsSelectedActions.Selected(this.order.insKey)).subscribe(() => {
      this.orderService.show(this.order.orderSide === 1 ? 'buy' : 'sell');
      this.store.dispatch(new OrderActions.setForm({
        editable: true,
        orderId: this.order.id || null,
        price: this.order.price,
        volume: this.order.remainingQuantity,
        validityType: this.order.validityType,
        date: this.order.validityType === 2 ? this.order.orderValidityDate : null
      }));
    });
  }
}
