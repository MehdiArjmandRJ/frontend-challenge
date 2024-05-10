import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
  GetRowIdParams,
  FirstDataRenderedEvent,
  GridSizeChangedEvent,
  DisplayedColumnsChangedEvent
} from 'ag-grid-community';
import { IOrderModel } from '../../../../../../../shared/modules/order/models/Orders-report';
import { ActiveOrdersGridService } from '../../services/active-orders-grid.service';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.scss']
})
export class ActiveOrdersComponent implements OnChanges {
  @Input() activeOrders: IOrderModel[];
  overlayLoadingTemplate = `<img src='assets/images/grid-loading.gif' width="100px" height="100px">`;
  private _clientWidth:number;

  constructor(public gridService: ActiveOrdersGridService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['activeOrders'].currentValue) {
      this.activeOrders = changes?.['activeOrders'].currentValue;
    }
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
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
