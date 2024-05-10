import { Injectable } from '@angular/core';

import { FormatterService } from '@app/shared/utils';

import { GridOptions, ColDef, CellClickedEvent } from 'ag-grid-community';
import { OrderSideComponent } from '../components/order-side/order-side.component';
import { InsSelectedActions } from '@app/core/store/instrument-selected/instrument-selected.actions';
import { Store } from '@ngxs/store';
import { NoRowOverlayComponent } from '@app/shared/modules/no-item/no-item.component';

@Injectable()
export class TradesGridService {
  tradesColumnDefs: ColDef[] = [
    {
      headerName: 'نماد',
      field: 'instrumentName',
      width: 85,
      onCellClicked: (event: CellClickedEvent) => {
        this.store.dispatch(new InsSelectedActions.Selected(event.data.insKey));
      },
    },
    {
      headerName: 'نوع',
      cellRenderer: OrderSideComponent,
      width: 100,
    },
    {
      headerName: 'حجم معامله',
      field: 'quantity',
      width: 150,
      valueFormatter: this.formatter.currency
    },
    {
      headerName: 'ارزش معامله',
      valueGetter: 'data.quantity * data.price',
      width: 150,
      valueFormatter: this.formatter.currency
    },
    {
      headerName: 'تاریخ - ساعت',
      field: 'tradeDate',
      width: 150,
      valueFormatter: this.formatter.utcToJalaliWithTime
    },
  ];
  tradesGridOptions: GridOptions = {
    defaultColDef: {
      flex: 0,
      sortable: false,
      suppressMovable: true
    },
    noRowsOverlayComponent: NoRowOverlayComponent,
    noRowsOverlayComponentParams: {
      message: 'سفارشی برای نمایش وجود ندارد',
      icon: 'c-empty',
      width: '65px',
      height: '65px'
    }
  };

  constructor(private formatter: FormatterService, private store: Store) { }
}
