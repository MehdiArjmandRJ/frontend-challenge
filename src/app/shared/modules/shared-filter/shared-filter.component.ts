import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { SvgIconComponent } from '@ngneat/svg-icon';

import { CommonModule } from '@angular/common';
import {
  RxFormGroup,
  RxReactiveFormsModule
} from '@rxweb/reactive-form-validators';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-filter',
  templateUrl: './shared-filter.component.html',
  styleUrls: ['./shared-filter.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    SvgIconComponent,
    CommonModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedFilterComponent {
  @Input({ required: true }) form: RxFormGroup;
  @Input('hidden') isFilterHidden = true;
  @Input() enabled: boolean = false;

  @Output() onFilterSubmit = new EventEmitter();
  @Output() onResetFilter = new EventEmitter();

  FilterSubmit() {
    this.onFilterSubmit.emit();
  }

  resetFilter() {
    this.form.reset();
    this.onResetFilter.emit();
  }

  toggleFilterForm() {
    this.isFilterHidden = !this.isFilterHidden;
  }
}
