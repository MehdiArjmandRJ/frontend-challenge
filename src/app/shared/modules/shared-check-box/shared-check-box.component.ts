import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
  RxFormGroup,
  RxReactiveFormsModule
} from '@rxweb/reactive-form-validators';

import { CheckBoxInterface } from '@app/shared/models/general.interface';

@Component({
  selector: 'app-shared-check-box',
  templateUrl: './shared-check-box.component.html',
  styleUrls: ['./shared-check-box.component.scss'],
  standalone: true,
  imports: [CommonModule, RxReactiveFormsModule]
})
export class SharedCheckBoxComponent {
  @Input() checkBoxList!: any[];
  @Input() errorMessage!: string;
  @Input() listOfValue!: string[];
  @Input() classList!: string;

  /** @howToUse Using: only use For Form */
  @Input() controlForm!: RxFormGroup;
  @Input() controlName!: string;

  @Output() checkBoxListChange: EventEmitter<any> = new EventEmitter();
  @Output() listOfValueChange: EventEmitter<any> = new EventEmitter();

  onChange(value: boolean, index: number) {
    this.checkBoxList[index].active = !value;
    this.checkBoxListChange.emit(this.checkBoxList);
    const selectedCheckBox: string[] = [];
    this.checkBoxList.forEach((item: CheckBoxInterface) => {
      if (item.active) {
        selectedCheckBox.push(item.value);
      }
    });
    if (this.controlForm) {
      this.controlForm.controls[this.controlName].patchValue(selectedCheckBox);
    } else {
      this.listOfValue = selectedCheckBox;
    }
    this.listOfValueChange.emit(this.checkBoxList);
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
