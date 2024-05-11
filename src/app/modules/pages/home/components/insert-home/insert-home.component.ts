import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-insert-home',
  templateUrl: './insert-home.component.html',
  styleUrls: ['./insert-home.component.scss']
})
export class InsertHomeComponent implements OnInit {
  @Input() form: RxFormGroup;
  @Input() isPending: boolean;
  @Input() visibleInsert: boolean;

  @Output() onSubmitInsert = new EventEmitter();
  @Output() onCancelInsert = new EventEmitter();
  constructor() { }

  ngOnInit(): void{
  }

  submitForm(): void{
    this.onSubmitInsert.emit();
  }

  cancel(): void{
    this.onCancelInsert.emit();
  }

}
