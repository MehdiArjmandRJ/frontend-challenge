import { Subject, Observable, concat, of } from 'rxjs';
import {
  distinctUntilChanged,
  switchMap,
  catchError,
  map,
  tap,
  debounceTime
} from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';
import {
  RxReactiveFormsModule,
  RxFormGroup
} from '@rxweb/reactive-form-validators';

import { ListItemInterface } from '@app/shared/models/general.interface';
import { HttpClient, HttpContext } from '@angular/common/http';
import { IS_LOADING_ENABLED } from '@app/core/interceptor/custom-auth-interceptor';
import { LoadingType } from '@app/core/models/config';
import { RequestType } from './model/Request';

@Component({
  selector: 'app-shared-auto-complete',
  templateUrl: './shared-auto-complete.component.html',
  styleUrls: ['./shared-auto-complete.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ]
})
export class SharedAutoCompleteComponent implements OnInit {
  @Input() request!: any;
  @Input() requestType!: RequestType;
  @Input() bindValue!: string;
  @Input() bindLabel!: string;
  @Input() loadingText!: string;
  @Input() placeHolder!: string;
  @Input() searchable!: boolean;
  @Input() notFoundText!: string;
  @Input() multiSelect!: boolean;
  @Input() theme!: string;
  @Input() typeToSearchText!: string;
  /** @howToUse Using: use ngModel */
  @Input() errorMessage!: string;
  @Input() value!: ListItemInterface;
  /** @howToUse Using: use ReactiveForm */
  @Input() controlName!: string;
  @Input() controlForm!: RxFormGroup;

  @Output() valueChange: EventEmitter<ListItemInterface> = new EventEmitter();

  autoCompleteLoading = false;
  autoComplete$: Observable<any[]> = new Observable<any[]>();
  autoCompleteInput$ = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadAutoComplete();
  }

  onChangeValue(event: ListItemInterface) {
    this.value = event;
    this.valueChange.emit(event);
  }

  onSelectClick(event) {
    event.stopPropagation();
  }

  private loadAutoComplete() {
    switch (this.requestType) {
      case 'POST':
        // eslint-disable-next-line no-unused-expressions
        this.autoComplete$ = concat(of([]),
          this.autoCompleteInput$
            .pipe(
              debounceTime(200),
              distinctUntilChanged(),
              tap(() => (this.autoCompleteLoading = true)),
              switchMap(term => {
                if (term === null) {
                  this.autoCompleteLoading = false;
                  return of([]);
                }

                return this.httpClient.post(this.request + term, {
                  context: new HttpContext().set(IS_LOADING_ENABLED, {
                    key: 'autoComplete',
                    type: LoadingType.component,
                    value: true
                  })
                }).pipe(
                  map((response: any) => response.map((data: any) => ({
                    value: data[this.bindValue],
                    label: data[this.bindLabel]
                  }))
                  ),
                  catchError(() => of([])),
                  tap(() => (this.autoCompleteLoading = false))
                );
              })
            )
        );
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        this.autoComplete$ = concat(of([]),
          this.autoCompleteInput$
            .pipe(
              debounceTime(200),
              distinctUntilChanged(),
              tap(() => (this.autoCompleteLoading = true)),
              switchMap(term => {
                if (term === null) {
                  this.autoCompleteLoading = false;
                  return of([]);
                }
                return this.httpClient
                  .get(this.request + term, {
                    context: new HttpContext().set(IS_LOADING_ENABLED, {
                      key: 'autoComplete',
                      type: LoadingType.component,
                      value: true
                    })
                  })
                  .pipe(
                    map((response: any) => response.map((data: any) => ({
                      value: data[this.bindValue],
                      label: data[this.bindLabel]
                    }))
                    ),
                    catchError(() => of([])),
                    tap(() => (this.autoCompleteLoading = false))
                  );
              })
            )
            .pipe()
        );

        break;
    }
  }

  getErrors() {
    const formControl: any = this.controlForm.controls[this.controlName];
    if (this.controlName) {
      return formControl['errorMessage'];
    } else {
      return null;
    }
  }

  compareFn(item: any, selected: any) {
    return item.value === selected.value;
  }

  checkErrors() {
    if (this.controlName) {
      return (
        !this.controlForm.controls[this.controlName].valid &&
        this.controlForm.controls[this.controlName].touched
      );
    } else {
      return null;
    }
  }
}
