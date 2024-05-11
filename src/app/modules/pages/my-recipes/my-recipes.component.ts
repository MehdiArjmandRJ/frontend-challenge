//Packages
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilitiesService } from '@app/shared/utils';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { BehaviorSubject } from 'rxjs';
import { GetRecipesModel } from '../home/models';

//Interfaces or Models
import { MyRecipesPageInterface } from './interface/my-recipes.interface';
import { SearchRecipesModel } from './models/my-recipes-form.model';
import { ColsData, RecipesResponseInterface } from './models/my-recipes.interface';

//Services
import { MyRecipesService } from './services/my-recipes.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
})
export class MyRecipesComponent implements OnInit, OnDestroy, MyRecipesPageInterface {
  isPending: boolean;
  visibleInsert: boolean;
  colsData: ColsData[];
  searchRecipesForm: RxFormGroup;
  recipesData: RecipesResponseInterface[];

  constructor(private myRecipesService: MyRecipesService, private rxFormBuilder: RxFormBuilder, private utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.myRecipesService.initialRecipesData();
    this.initialSearchForm();
    this.getRecipes();
    this.setTableHeaderValue();
    this.searchInList();
  }

  getRecipes(): BehaviorSubject<RecipesResponseInterface[]> | any {
    return this.myRecipesService.getRecipesData().data;
  }

  getRecipesCount(): number {
    return this.myRecipesService.getRecipesData().count;
  }

  setTableHeaderValue(): void {
    this.colsData = [
      { field: 'name', header: 'Name', type: 'text' },
      { field: 'recipe', header: 'Recipes', type: 'file' },
      { field: 'image', header: 'Image', type: 'img' },
      { field: 'tools', header: 'Tools', type: 'tools' },
    ]
  };

  initialSearchForm(): void {
    let newForm: SearchRecipesModel = new SearchRecipesModel();
    this.searchRecipesForm = this.rxFormBuilder.formGroup(newForm) as RxFormGroup;
  }

  searchInList(): void {
    //i try to create a autocomplete for search with delay with rxjs but for this search i chose this way (use pipe) because we have static data;
    //u can see my code in shared-auto-complete module
  }

  removeRow(index: number) {
    let currentData = this.getRecipes().getValue();
    currentData.splice(index, 1)
    let newData: GetRecipesModel = {
      data: [...currentData],
      count: this.getRecipesCount() - 1 < 0 ? 0 : this.getRecipesCount() - 1
    }
    this.myRecipesService.removeMyRecipesData(newData);
  }


  ngOnDestroy(): void {
    this.myRecipesService.unsubscribe();
  }

}
