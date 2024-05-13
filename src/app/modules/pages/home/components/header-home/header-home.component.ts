import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  @Input() count: number;
  @Input() form: RxFormGroup;
  @Input() isPending: boolean;

  @Output() insertRecipe = new EventEmitter;
  constructor() { }

  ngOnInit() {
    console.log(this.form);
  }

  insert() {
    this.insertRecipe.emit();
  }

}
