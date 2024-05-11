import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseRepositoryInterface } from '@app/shared/models/general.interface';
import { Observable, tap } from 'rxjs';
import { RecipesResponseInterface } from '../models/home.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeRepositoryService {
  constructor(private httpClient: HttpClient) {
  }

  public getRecipesData(): Observable<ResponseRepositoryInterface<RecipesResponseInterface[]>> {
    return this.httpClient.get('./../../../../../assets/mock/recipes.json').pipe(
      tap((response: ResponseRepositoryInterface<RecipesResponseInterface[]>) => { return response.data })
    )
  }

}
