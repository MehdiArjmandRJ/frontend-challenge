//Modules
import { Observable, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

//Models
import { GetRecipesModel } from '../models/home.interface';

//Store
import { Select, Store } from '@ngxs/store';
import { DataActions } from '@app/core/store/data.action';
import { DataSelectors } from '@app/core/store/data.selector';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private count: number;
  private subscriptions: Subscription = new Subscription();

  @Select(DataSelectors.getRecipesItemNames) private getRecipesItemNames$;
  @Select(DataSelectors.getCountRecipesItem) private getCountRecipesItem$;

  constructor(private store: Store) {}


  public getRecipesData(): GetRecipesModel {
    // take response and push on state or your custom state
    return {
      data: this.getRecipesItemNames$,
      count: this.getCountRecipesItem$,
    };
  }


  public insertRecipesData(data: any): void {
    this.store.dispatch(new DataActions.Insert(data));
  }

  public unsubscribe(): void {
    // unsubscribe all observable in home component if u need;
    this.subscriptions.unsubscribe();
  }
}
