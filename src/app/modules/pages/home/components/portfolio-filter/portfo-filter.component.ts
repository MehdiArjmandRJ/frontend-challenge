import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {
  PortfolioGridService,
  ToggleHeight
} from '../../services/portfolio-gird.service';
import { ColDefs } from '../../models/grid';

@Component({
  selector: 'app-filter-portfo',
  templateUrl: './portfo-filter.component.html',
  styleUrls: ['./portfo-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterPortfoComponent implements OnInit {
  @Input() enabled: boolean = false;
  filters: ColDefs[] = [];
  @Output() filterChange = new EventEmitter<any[]>();

  constructor(private gridService: PortfolioGridService) {}

  ngOnInit(): void {
    this.filters = this.gridService.columnDefs;

    this.filters = this.filters.filter(item => !item.undisplayable);
    this.filters = this.filters.map(filter => {
      if ('hide' in filter) {
        return filter;
      } else {
        filter.hide = false;
        return filter;
      }
    });
  }

  toggleHeight(input: ToggleHeight): void {
    this.gridService.toggleHeight(input);
  }

  select(filter): void {
    filter.hide = filter.hide ? false : true;

    this.gridService.filterChange(filter);
  }
}
