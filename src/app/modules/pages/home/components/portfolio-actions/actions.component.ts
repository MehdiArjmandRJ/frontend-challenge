import { Component } from '@angular/core';
import { Stock } from '@app/shared/modules/portfolio/models/Stock';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TooltipOptions } from 'primeng/api';

@Component({
  selector: 'app-actions-portfo-grid',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsPortfoGridComponent implements ICellRendererAngularComp {
  stock: Stock;
  readonly tooltipOptions: TooltipOptions = {
    showDelay: 100,
    tooltipEvent: 'hover',
    tooltipPosition: 'top',
  };

  agInit({ data }: ICellRendererParams): void {
    this.stock = data;
  }

  // eslint-disable-next-line no-unused-vars
  refresh(params: ICellRendererParams): boolean {
    return true;
  }

}
