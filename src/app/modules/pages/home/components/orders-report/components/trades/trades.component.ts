import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
  GridApi,
  FirstDataRenderedEvent,
  GridSizeChangedEvent,
  DisplayedColumnsChangedEvent
} from 'ag-grid-community';
import { ITradeModel } from '../../../../../../../shared/modules/order/models/Orders-report';
import { TradesGridService } from '../../services/trades-grid.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnChanges {
  @Input() trades: ITradeModel[];

  overlayLoadingTemplate = `<img src='assets/images/grid-loading.gif' width="100px" height="100px">`;
  gridApi: GridApi;
  private _clientWidth:number;

  constructor(public gridService: TradesGridService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['trades'].currentValue) {
      this.trades = changes?.['trades'].currentValue;
    }
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    this.gridApi = params.api;
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
}
