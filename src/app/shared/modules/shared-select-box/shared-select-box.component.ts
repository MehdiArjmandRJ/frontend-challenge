import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { RxFormGroup, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ListItemInterface } from '@app/shared/models/general.interface';

@Component({
  selector: 'app-shared-select-box',
  templateUrl: './shared-select-box.component.html',
  styleUrls: ['./shared-select-box.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ]
})
export class SharedSelectBoxComponent {
  @Input() placeHolder!: string;
  @Input() searchable!: boolean;
  @Input() notFoundText!: string;
  @Input() multiSelect!: boolean;
  @Input() listItems!: ListItemInterface[];
  /** @howToUse Using: use ngModel */
  @Input() errorMessage!: string;
  @Input() value!: ListItemInterface;
  /** @howToUse Using: use ReactiveForm */
  @Input() controlName!: string;
  @Input() controlForm!: RxFormGroup;
  @Input() className!: string;
  @Output() valueChange: EventEmitter<ListItemInterface> = new EventEmitter();

  onChangeValue(event: ListItemInterface) {
    if (this.controlForm) {
      this.controlForm.controls[this.controlName].setValue(event.value);
    }
    this.value = event;
    this.valueChange.emit(event);
  }

  onClearValue() {
    this.controlForm.controls[this.controlName].setValue('');
  }

  getErrors() {
    const formControl: any = this.controlForm.controls[this.controlName];
    if (this.controlName) {
      return formControl['errorMessage'];
    } else {
      return null;
    }
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
