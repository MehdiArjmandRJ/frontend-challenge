import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RxFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
})
export class HeaderHomeComponent implements OnInit {
  @Input() count: Observable<number>;
  @Input() form: RxFormGroup;
  @Input() isPending: boolean;

  @Output() insertRecipe = new EventEmitter();
  constructor() {}

  ngOnInit() {
    console.log(this.count);
  }

  insert() {
    this.insertRecipe.emit();
  }
}
