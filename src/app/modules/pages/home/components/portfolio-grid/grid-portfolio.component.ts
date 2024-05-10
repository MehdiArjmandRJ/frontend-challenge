import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Store } from '@ngxs/store';
import { DisplayedColumnsChangedEvent, GridSizeChangedEvent } from 'ag-grid-community';

import { InsSelectedActions } from '@app/core/store/instrument-selected/instrument-selected.actions';
import { PortfolioGridService } from '../../services/portfolio-gird.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-grid-portfolio',
  templateUrl: './grid-portfolio.component.html',
  styleUrls: ['./grid-portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridPortfolioComponent implements OnInit, OnDestroy {
  @Input() enabled: boolean = false;
  private _destroy$ = new Subject<void>();
  private _clientWidth: number;

  constructor(
    public gridService: PortfolioGridService,
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    if (!this.enabled) {
      this.gridService.rowData = [];
    } else {
      this.gridService.portfolio$().pipe(
        takeUntil(this._destroy$)
      ).subscribe(() => this.cdr.detectChanges());
    }
  }

  onCellClicked(event) {
    this.store.dispatch(new InsSelectedActions.Selected(event.data.insKey));
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

  ngOnDestroy(): void {
    this.gridService.onDestroy();
    this._destroy$.next();
    this._destroy$.complete();
  }
}
