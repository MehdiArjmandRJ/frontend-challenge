import { Injectable } from '@angular/core';
import { ResponseRepositoryInterface } from '@app/shared/models/general.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GetRecipesModel, RecipesResponseInterface } from '../models/my-recipes.interface';
import { MyRecipesRepositoryService } from '../repository/my-recipes-repository.service';

@Injectable({
    providedIn: 'root'
})
export class MyRecipesService {
    private count: number = 0;
    private subscriptions: Subscription = new Subscription();
    private recipesData: BehaviorSubject<RecipesResponseInterface[]> = new BehaviorSubject([]);
    constructor(private myRecipesRepositoryService: MyRecipesRepositoryService) {
    }

    public initialRecipesData(): void {
        this.myRecipesRepositoryService.getRecipesData().subscribe((response: ResponseRepositoryInterface<RecipesResponseInterface[]>) => {
            //do any change on data
            this.count = 0;
            let newMyRecipes: RecipesResponseInterface[] = [];
            response.data.forEach((item: RecipesResponseInterface) => {
                if (item.userId === '1') {
                    newMyRecipes.push(item);
                    this.count++;
                }
            })
            this.recipesData.next(newMyRecipes);
        });
    }

    public getRecipesData(): GetRecipesModel {
        // take response and push on state or your custom state
        return { "data": this.recipesData, "count": this.count };
    }

    public removeMyRecipesData(data: any): void {
        this.count = data.count;
        this.recipesData.next(data.data);
    }



    public unsubscribe(): void {
        // unsubscribe all observable in home component;
        this.subscriptions.unsubscribe()
    }

}
