import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IOrderModel } from '../../../../../../../shared/modules/order/models/Orders-report';

@Component({
  selector: 'app-order-side',
  templateUrl: './order-side.component.html',
  styleUrls: ['./order-side.component.scss']
})
export class OrderSideComponent implements ICellRendererAngularComp {
  order: IOrderModel;
  orderSideTitle: string;

  agInit(params: ICellRendererParams): void {
    this.order = params.data;
    this.orderSideTitle = this.sideNumberToTitle(this.order.orderSide);
  }

  refresh(params: ICellRendererParams): boolean {
    this.order = params.data;
    return true;
  }

  sideNumberToTitle(sideValue) {
    const key = Number(sideValue);
    switch (key) {
      case 1: { return 'خرید'; }
      case 2: { return 'فروش'; }
      default: { return 'خرید'; }
    }
  }
}
