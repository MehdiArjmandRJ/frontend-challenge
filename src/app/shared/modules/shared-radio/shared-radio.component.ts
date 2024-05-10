import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
  RxReactiveFormsModule,
  RxFormGroup
} from '@rxweb/reactive-form-validators';

import { RadioButtonInterface } from '@app/shared/models/general.interface';
@Component({
  selector: 'app-shared-radio',
  templateUrl: './shared-radio.component.html',
  styleUrls: ['./shared-radio.component.scss'],
  standalone: true,
  imports: [CommonModule, RxReactiveFormsModule]
})
export class SharedRadioComponent {
  @Input() radioList!: RadioButtonInterface[];
  @Input() errorMessage!: string;

  /** @howToUse Using: only use For Form */
  @Input() controlForm!: RxFormGroup;
  @Input() controlName!: string;
  @Output() radioListChange: EventEmitter<any> = new EventEmitter();

  onChange(value: string | number, index: number) {
    this.radioList.forEach(item => {
      item.active = false;
    });
    this.radioList[index].active = true;
    this.radioListChange.emit(this.radioList);
    if (this.controlForm) {
      this.controlForm.controls[this.controlName].patchValue(value);
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
