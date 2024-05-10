import { Injectable } from '@angular/core';

import { FormatterService } from '@app/shared/utils';

import { GridOptions, ColDef, ValueFormatterParams, CellClickedEvent } from 'ag-grid-community';
import { OrdersStatusEnumeration } from '../models/orders-status.enum';
import { OrderActionsComponent } from '../components/order-actions/order-actions.component';
import { OrderSideComponent } from '../components/order-side/order-side.component';
import { OrderDetailComponent } from '../components/order-detail/order-detail.component';
import { InsSelectedActions } from '@app/core/store/instrument-selected/instrument-selected.actions';
import { Store } from '@ngxs/store';
import { NoRowOverlayComponent } from '@app/shared/modules/no-item/no-item.component';

@Injectable()
export class ActiveOrdersGridService {
  activeOrdersColumnDefs: ColDef[] = [
    {
      headerName: 'نماد',
      field: 'instrumentName',
      width: 100,
      onCellClicked: (event: CellClickedEvent) => {
        this.store.dispatch(new InsSelectedActions.Selected(event.data.insKey));
      },
    },
    {
      headerName: 'نوع سفارش',
      cellRenderer: OrderSideComponent,
      width: 100
    },
    {
      headerName: 'حجم سفارش',
      field: 'quantity',
      valueFormatter: this.formatter.currency,
      width: 150
    },
    {
      headerName: 'قیمت سفارش',
      field: 'price',
      valueFormatter: this.formatter.currency,
      width: 150
    },
    {
      headerName: 'ارزش سفارش',
      field: 'orderValue',
      valueGetter: 'data.orderValue * data.commision',
      valueFormatter: this.formatter.currency,
      width: 150
    },
    {
      headerName: 'تاریخ - ساعت',
      field: 'orderEntryDateTime',
      valueFormatter: this.formatter.utcToJalaliWithTime,
      width: 150
    },
    {
      headerName: 'عملیات',
      cellRenderer: OrderActionsComponent,
      width: 100
    },
    {
      headerName: 'جزییات سفارش',
      cellRenderer: OrderDetailComponent,
      width: 100
    },
  ];
  activeOrdersGridOptions: GridOptions = {
    defaultColDef: {
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

  statusNumberToTitle(params: ValueFormatterParams) {
    const key = Number(params.value);
    return OrdersStatusEnumeration.get(key)?.title;
  }
}
