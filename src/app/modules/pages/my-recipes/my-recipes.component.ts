//Packages
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';

//Interfaces or Models
import { MyRecipesPageInterface } from './interface/my-recipes.interface';
import { SearchRecipesModel } from './models/my-recipes-form.model';
import {
  ColsData,
  RecipesResponseInterface,
} from './models/my-recipes.interface';

//Services
import { MyRecipesService } from './services/my-recipes.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
})
export class MyRecipesComponent
  implements OnInit, OnDestroy, MyRecipesPageInterface
{
  isPending: boolean;
  visibleInsert: boolean;
  colsData: ColsData[];
  searchRecipesForm: RxFormGroup;
  recipesData: RecipesResponseInterface[];

  constructor(
    private myRecipesService: MyRecipesService,
    private rxFormBuilder: RxFormBuilder
  ) {}

  ngOnInit(): void {
    this.initialSearchForm();
    this.getRecipes();
    this.setTableHeaderValue();
    this.searchInList();
  }

  getRecipes(): Observable<RecipesResponseInterface[]> | any {
    return this.myRecipesService.getRecipesData().data;
  }

  getRecipesCount(): Observable<number> | any {
    return this.myRecipesService.getRecipesData().count;
  }

  setTableHeaderValue(): void {
    this.colsData = [
      { field: 'name', header: 'Name', type: 'text' },
      { field: 'recipe', header: 'Recipes', type: 'file' },
      { field: 'image', header: 'Image', type: 'img' },
      { field: 'tools', header: 'Tools', type: 'tools' },
    ];
  }

  initialSearchForm(): void {
    let newForm: SearchRecipesModel = new SearchRecipesModel();
    this.searchRecipesForm = this.rxFormBuilder.formGroup(
      newForm
    ) as RxFormGroup;
  }

  searchInList(): void {
    //i try to create a autocomplete for search with delay with rxjs but for this search i chose this way (use pipe) because we have static data;
    //u can see my code in shared-auto-complete module
  }

  removeRow(data: any) {
    this.myRecipesService.removeMyRecipesData(data.data.id);
  }

  ngOnDestroy(): void {
    this.myRecipesService.unsubscribe();
  }
}
