//Packages
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';

//Interfaces or Models
import { HomePageInterface } from './interface';
import {
  ColsData,
  GetRecipesModel,
  InsertRecipesModel,
  RecipesResponseInterface,
  SearchRecipesModel,
} from './models';

//Services
import { UtilitiesService } from '@app/shared/utils';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, HomePageInterface {
  isPending: boolean;
  visibleInsert: boolean;
  colsData: ColsData[];
  insertRecipeForm: RxFormGroup;
  searchRecipesForm: RxFormGroup;
  recipesData: RecipesResponseInterface[];

  constructor(
    private homeService: HomeService,
    private rxFormBuilder: RxFormBuilder,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.initialSearchForm();
    this.getRecipes();
    this.setTableHeaderValue();
    this.searchInList();
  }

  getRecipes(): Observable<RecipesResponseInterface[]> | any {
    return this.homeService.getRecipesData().data;
  }

  getRecipesCount(): Observable<number> | any {
    return this.homeService.getRecipesData().count;
  }

  setTableHeaderValue(): void {
    this.colsData = [
      { field: 'name', header: 'Name', type: 'text' },
      { field: 'recipe', header: 'Recipes', type: 'file' },
      { field: 'image', header: 'Image', type: 'img' },
    ];
  }

  initialSearchForm(): void {
    let newForm: SearchRecipesModel = new SearchRecipesModel();
    this.searchRecipesForm = this.rxFormBuilder.formGroup(
      newForm
    ) as RxFormGroup;
  }

  initialInsertForm(): void {
    let newForm: InsertRecipesModel = new InsertRecipesModel();
    this.insertRecipeForm = this.rxFormBuilder.formGroup(
      newForm
    ) as RxFormGroup;
  }

  searchInList(): void {
    //i try to create a autocomplete for search with delay with rxjs but for this search i chose this way (use pipe) because we have static data;
    //u can see my code in shared-auto-complete module
  }

  insertRecipe(): void {
    this.initialInsertForm();
    this.visibleInsert = true;
  }

  submitInsert(): void {
    if (this.insertRecipeForm.valid) {
      this.isPending = true;
      this.visibleInsert = false;
      //set 3000 ms delay for Submit Insert
      setTimeout(() => {
        this.homeService.insertRecipesData(this.insertRecipeForm.value);
        this.isPending = false;
      }, 2000);
    } else {
      this.utilitiesService.validateFormFields(
        this.insertRecipeForm as RxFormGroup
      );
    }
  }

  ngOnDestroy(): void {
    this.homeService.unsubscribe();
  }
}
