import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  RxReactiveFormsModule,
  RxFormGroup
} from '@rxweb/reactive-form-validators';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-shared-input',
  templateUrl: './shared-input.component.html',
  styleUrls: ['./shared-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    FormsModule,
    NgxMaskPipe,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    RxReactiveFormsModule,
  ],
  providers: [provideNgxMask()]
})
export class SharedInputComponent implements OnChanges {
  private visiblePassword = false;
  @Input() icon: string;
  @Input() isCurrency!: boolean;
  @Input() maxLength!: string;
  @Input() type!: string;
  @Input() placeHolder!: string;
  /**  @howToUse Using: use Reactive Forms */
  @Input() controlName!: string;
  @Input() controlForm!: RxFormGroup;
  /** @howToUse Using: use ngModel */
  @Input() showError!: boolean;
  @Input() errorMessage!: string;
  @Input() value!: string;
  @Input() inputHeight: string;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['showError']?.currentValue) {
      this.showError = changes?.['showError']?.currentValue;
    }
    if (changes?.['errorMessage']?.currentValue) {
      this.errorMessage = changes?.['errorMessage']?.currentValue;
    }
  }

  get getCheckType() {
    return this.type === 'password' ? true : false;
  }

  get getVisiblePassword() {
    return this.visiblePassword;
  }

  onChangeValue(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(event.target.value);
  }

  onClickToggleVisiblePassword(): void {
    this.visiblePassword = !this.visiblePassword;
  }

  onClearValue() {
    this.controlForm.controls[this.controlName].setValue(null);
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
