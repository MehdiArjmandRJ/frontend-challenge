import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'header-my-recipes',
  templateUrl: './header-my-recipes.component.html',
  styleUrls: ['./header-my-recipes.component.scss']
})
export class HeaderMyRecipesComponent {
  @Input() count: number;
  @Input() form: RxFormGroup;
  @Input() isPending: boolean;

  @Output() insertRecipe = new EventEmitter;
  constructor() { }

  insert() {
    this.insertRecipe.emit();
  }

}
