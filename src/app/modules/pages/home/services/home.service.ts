import { Injectable } from '@angular/core';
import { ResponseRepositoryInterface } from '@app/shared/models/general.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GetRecipesModel, RecipesResponseInterface } from '../models/home.interface';
import { HomeRepositoryService } from '../repository/home-repository.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private count: number;
    private subscriptions: Subscription = new Subscription();
    private recipesData: BehaviorSubject<RecipesResponseInterface[]> = new BehaviorSubject([]);
    constructor(private homeRepositoryService: HomeRepositoryService) {
    }

    public initialRecipesData(): void {
        this.homeRepositoryService.getRecipesData().subscribe((response: ResponseRepositoryInterface<RecipesResponseInterface[]>) => {
            //do any change on data
            this.count = response.data.length;
            this.recipesData.next(response.data);
        });
    }

    public getRecipesData(): GetRecipesModel {
        // take response and push on state or your custom state
        return { "data": this.recipesData, "count": this.count };
    }

    public insertRecipesData(data: any): void {
        this.count = data.count;
        this.recipesData.next(data.data);
    }



    public unsubscribe(): void {
        // unsubscribe all observable in home component;
        this.subscriptions.unsubscribe()
    }

}
