import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetRecipesModel } from '../models/my-recipes.interface';
import { Select, Store } from '@ngxs/store';
import { DataSelectors } from '@app/core/store/data.selector';
import { DataActions } from '@app/core/store/data.action';

@Injectable({
  providedIn: 'root',
})
export class MyRecipesService {
  private subscriptions: Subscription = new Subscription();

  @Select(DataSelectors.getMyRecipesItemNames) private getMyRecipesItemNames$;
  @Select(DataSelectors.getCountMyRecipesItem) private getCountMyRecipesItem$;

  constructor(private store: Store) {}

  public getRecipesData(): GetRecipesModel {
    // take response and push on state or your custom state
    return {
      data: this.getMyRecipesItemNames$,
      count: this.getCountMyRecipesItem$,
    };
  }

  public removeMyRecipesData(id: number): void {
    this.store.dispatch(new DataActions.Remove(id));
    // this.recipesData.next(data.data);
  }

  public unsubscribe(): void {
    // unsubscribe all observable in home component;
    this.subscriptions.unsubscribe();
  }
}
