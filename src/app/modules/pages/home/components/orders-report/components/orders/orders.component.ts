import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
  GetRowIdParams,
  GridSizeChangedEvent,
  DisplayedColumnsChangedEvent
} from 'ag-grid-community';
import { IOrderModel } from '@app/shared/modules/order/models/Orders-report';
import { OrdersGridService } from '../../services/orders-grid.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnChanges {
  @Input() orders: IOrderModel[];

  overlayLoadingTemplate = `<img src='assets/images/grid-loading.gif' width="100px" height="100px">`;
  private _clientWidth:number;

  constructor(public gridService: OrdersGridService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['orders'].currentValue) {
      this.orders = changes?.['orders'].currentValue;
    }
  }

  onGridSizeChanged(params: GridSizeChangedEvent) {
    this._clientWidth = params.clientWidth;

    if (params.clientWidth < 1000) {
      params.columnApi.autoSizeAllColumns();
    } else {
      params.api.sizeColumnsToFit();
    }
  }

  onDisplayedColumnsChanged(params: DisplayedColumnsChangedEvent) {
    if (this._clientWidth > 1000) {
      params.api.sizeColumnsToFit();
    }
  }

  getRowId(params: GetRowIdParams) {
    return params.data.id;
  }
}
