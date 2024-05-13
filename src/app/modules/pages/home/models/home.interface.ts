import { Observable } from "rxjs";

export interface RecipesResponseInterface {
  name: string;
  image: string;
  recipes: string;
  userId: string;
}

export interface ColsData {
  field: string;
  header: string;
  type: string;
  userId?: string;
}

export interface GetRecipesModel {
  data: Observable<RecipesResponseInterface[]> | RecipesResponseInterface[];
  count: number;
}
