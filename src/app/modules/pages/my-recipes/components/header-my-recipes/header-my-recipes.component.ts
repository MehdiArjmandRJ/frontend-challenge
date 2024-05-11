import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'header-my-recipes',
  templateUrl: './header-my-recipes.component.html',
  styleUrls: ['./header-my-recipes.component.scss']
})
export class HeaderMyRecipesComponent implements OnInit {
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
